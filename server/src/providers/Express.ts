import * as express from 'express'
import * as path from 'path'
import * as compression from 'compression'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as history from 'connect-history-api-fallback'
import * as cors from 'cors'
import * as redis from 'redis'
import * as lusca from 'lusca'
import * as passport from 'passport'

import * as auth from '../config/passport'

/** All Auth functions */
import * as Api from '../controllers/Api'

/** Middlewares */
import Env from './Environment'
import Log from '../middlewares/Log'
import Clean from '../middlewares/Clean'
import { IRequest, IResponse } from '../interfaces'
import { User } from '../models/User'

const jwt = require('jsonwebtoken')

/** App Constants */
const PORT = 1980
const DEV_URL = Env.get().devUrl
const PROD_URL = Env.get().prodUrl
const DEV_PUB_URL = Env.get().devPubUrl
const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

class Express {
	public app: express.Application

	constructor () {
		this.app = express()
	}

	public init (): any {

		this.app.set('port', PORT)
		this.app.use(compression())
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))

		this.app.use(session({
			cookie: {
				// sameSite: process.env.NODE_ENV === 'production' ? true : false,
				maxAge: 1000 * 60 * 60 * 24 // One Day
				// secure: process.env.NODE_ENV === 'production' ? true : false
			},
			saveUninitialized: true,
			resave: true,
			secret: Env.get().appSecret,
			store: new RedisStore({ client: redisClient })
		}))

		if (process.env.NODE_ENV === 'production') { this.app.set('trust proxy', 1) }

		this.app.use(passport.initialize())
		this.app.use(passport.session())

		// Middleware
		this.app.use((req, res, next) => {

			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

			next()
		})

		/**
		 * CORS --
		 * In Prod => allow from google and all subdoms & welcomeqr and all subdoms
		 * In Dev => allow from google and all subdoms and the local host ports used in dev
		 * Dev is probably okay to just be * but ¯\_(ツ)_/¯
		 */
		this.app.use(cors({
			origin:
				process.env.NODE_ENV !== 'production' ?
					[DEV_URL, DEV_PUB_URL, '/\.google.com\.com$/']
					: [PROD_URL, '/\.google.com\.com$/'],
			credentials: true
		}))

		if (process.env.NODE_ENV === 'production') {
			this.app.use(lusca.xframe('SAMEORIGIN'))
			this.app.use(lusca.xssProtection(true))
		}

		/** -------------- Auth & Account -------------- */

		// Local
		this.app.post('/auth/login', Api.login)
		this.app.post('/auth/signup', Api.signup)
		this.app.post('/auth/logout', Api.logout)
		this.app.post('/auth/verify_email', Api.verifyemail)
		this.app.post('/auth/forgot', Api.forgotpassword)
		this.app.post('/auth/reset', Api.resetpassword)

		// Helper for frontend, checks if session exists
		// if session => ensures JWT is granted
		// if session & JWT => returns the user linked to the session
		this.app.post('/auth/user', auth.isReqAllowed, Api.getuser)

		// Account settings
		this.app.post('/auth/toggle_subscribe', auth.isReqAllowed, Api.togglesubscribe)
		this.app.post('/auth/user_settings', auth.isReqAllowed, Api.usersettings)

		// Plumbing and Misc
		this.app.post('/auth/contact', Api.contact)

		// Google
		this.app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }))

		this.app.get('/auth/google/callback', passport.authenticate(
			'google',
			{
				failureRedirect: `${BASE_URL}/?authRedirect=true`
			}
		),
		async (req: IRequest, res: IResponse) => {

			/**
			 * Google has returned the email address and verified it, log the user in
			 * and grant them a token
			 */
			const _user = await User.findOne({ _id: req.user._id })

			if (_user) {
				req.logIn(_user, (err) => {

					if (err) { return Clean.authError('login::passport::login-err', err, res) }

					const tokenPayload = {
						userid: _user._id,
						email: _user.email,
						role: _user.role
					}

					const token = jwt.sign(tokenPayload, Env.get().tokenSecret, { expiresIn: `2 days` })

					// redirect to the FE component set to eat the token and deal with FE auth
					res.redirect(`${BASE_URL}/authcb?token=${token.split('.').join('~')}`)

				})
			} else {
				Log.info(`[Passport Google Success CB] No user found when using findOne(req.user._id)`)
				return Clean.authError('Passport Google Success CB', 'No user found when using findOne(req.user._id)', res)
			}

		})

		/** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
		this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.use(history({
			verbose: true,
			disableDotRule: true
		}))

		this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.listen(PORT, () => {

			// if (_error) { return console.log('Error: ', _error) }

			Log.info(
				`Server :: Running @ ${process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL} :: in ${process.env.NODE_ENV} mode`
			, [Log.TAG_RESTARTED])

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`)
		})
	}
}

export default new Express()
