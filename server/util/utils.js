// route middleware to make sure a user is logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.status(401).send({
            'status': 401,
            'message': 'You are not authenticated.'
        })
    }
}
