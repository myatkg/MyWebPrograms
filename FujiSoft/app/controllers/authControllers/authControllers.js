var exports = module.exports = {};
exports.signup = function(req, res) {
    res.render('auth/signup');
};
exports.login = function(req, res){
    res.render('auth/login');
};
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if(err) throw err;
        res.redirect('/login');
    });
};