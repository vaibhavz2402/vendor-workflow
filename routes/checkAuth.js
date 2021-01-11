
module.exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login') // if not auth
}


module.exports.destroySession = function destroySession(req, res) {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
}

