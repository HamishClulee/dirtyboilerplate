let mongoose = require('mongoose')

// define the schema for our user model
let subscription = mongoose.Schema({
    email: String
})

module.exports = mongoose.model('email', subscription)