var authController = require('../../controllers/authControllers/authControllers.js'),
    middleware     = require("../../controllers/middlewares/");
module.exports = function(router, passport) {
    
    router.get('/signup', authController.signup);
    
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dispatch',
        failureRedirect: '/signup'
        }
    ));
    
    router.get('/login', middleware.haveLoggedIn, authController.login);
    
    router.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/dispatch',
        failureRedirect: '/login'
        }
    ));
    
    router.get('/logout', authController.logout);
};