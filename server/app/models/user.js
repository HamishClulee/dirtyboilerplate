let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')

// define the schema for our user model
let userSchema = mongoose.Schema({
    email: { type: String, default: '' },
    password: String,
    role: { type: String, default: 'user' }
})

// methods ====================================================================
// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)
