// packages ===================================================================
let port = process.env.PORT || 5001
let express = require('express')
let app = express()
let mongoose = require('mongoose')
let colors = require('colors')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let cors = require('cors')
let passport = require('passport')
let flash = require('connect-flash')
let session = require('express-session')
let MongoStore = require('connect-mongo')(session)
let history = require('connect-history-api-fallback')
let _static = express.static('front-end')
let _config = require('./config/app.js')
let compression = require('compression')

// logging ===================================================================
if (process.env.NODE_ENV === 'production') {
    app.use(require('morgan')('combined'))
}

// configuration ==============================================================
require('./config/passport')(passport)
mongoose.Promise = global.Promise
mongoose.connect(_config.dburl)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '',
    // enter your domain where the empty string is
    credentials: true
}))
app.use(session({
    secret: _config.sessionkey,
    name: 'boilerplate_auth',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true,
    maxAge: 7200000,
    secure: process.env.NODE_ENV !== 'development'
}))

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
}

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.set('view engine', 'ejs')

// ROUTES =====================================================================
// AUTH ===================================================
app.use('/', require('./app/routes/auth'))
// API ====================================================
app.use('/api', require('./app/routes/api.js'))
// ADMIN ==================================================

// PAYMENT ================================================

// STATIC =================================================
app.use(_static)

// SETTINGS ===================================================================
app.use(history({
    verbose: true,
    disableDotRule: true
}))
app.get('*', _static)

// launch =====================================================================
app.listen(port)

// go berries =================================================================
console.log('======< ' + 'Node server running on localhost:'.green + port + ' - may the force be with you.'.green + ' >======\n')
