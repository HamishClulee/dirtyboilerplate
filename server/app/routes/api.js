let express = require('express')
let router = express.Router()
let _email = require('../models/subscription.js')

router.post('/subscribe', (req, res) => {
    let email = new _email({
        email: req.body.email
    })
    email.save(err => {
        if (!err) {
            return res.status(200).send('Have a cookie!')
        } else {
            return res.status(502).send('Something went wrong when saving that email....')
        }
    })
})

module.exports = router
