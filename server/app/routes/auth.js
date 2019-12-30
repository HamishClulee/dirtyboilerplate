let express = require('express')
let router = express.Router()
let passport = require('passport')
let UTIL = require('../../util/utils.js')
let User = require('../models/user')

// LOGIN ===============================
router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') })
})
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}))
// SIGNUP =============================
router.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') })
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}))
// PROFILE =============================
router.get('/profile', UTIL.isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    })
})
// LOGOUT ==============================
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})
// CHALLENGE ==============================
router.get('/api/session_challenge', UTIL.isLoggedIn, (req, res) => {
    res.send('welcome...')
})

router.get('/api/admin_challenge', (req, res) => {
    // no user logged in return early
    if (!req.session.passport) {
        return res.status(401).send({
            'status': 401,
            'message': 'No user logged in.'
        })
    } else {
        User.findOne({ _id: req.session.passport.user }, (err, user) => {
            if (err) {
                return res.status(401).send({
                    'status': 401,
                    'message': 'You are not authenticated.'
                })
            }

            if (user) {
                if (user.role === 'admin') {
                    return res.status(200).send({ userContent: 'you are a premium user' })
                } else {
                    return res.status(403).send({
                        'status': 403,
                        'message': 'You are not an admin user'
                    })
                }
            } else {
                return res.status(401).send({
                    'status': 401,
                    'message': 'You are not authenticated.'
                })
            }
        })
    }
})

module.exports = router