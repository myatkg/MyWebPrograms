var dispatch_queries = require('../../controllers/queries/dispatch_queries.js');
var middleware      = require('../../controllers/middlewares');
module.exports = function(app, connection) {
    //Search_query
    app.get('/dispatch', middleware.isLoggedIn, dispatch_queries.search);
    //Edit_Query
    app.get('/dispatch/edit', middleware.isLoggedIn, dispatch_queries.edit);
    //Add Route
    app.get('/dispatch/add', middleware.isLoggedIn, dispatch_queries.add);
    //Update Route
    app.post('/dispatch/edit', middleware.isLoggedIn, dispatch_queries.update);
};