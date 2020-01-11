var express         = require("express"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    session         = require("express-session"),
    env             = require("dotenv").load(),
    models          = require("./app/models"),
    app             = express();
//==================================================================//

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//==================================================================//
app.use(session({
    secret: 'fuji is the best infrastructure company in Japan',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;//currentUser can be called anywhere!!!!
    next();
});
//==================================================================//

//Sync Database
models.sequelize.sync().then(function() {
}).catch(function(err) {
    if(err) throw err;
});

//Load PassportJS Strategies
require('./app/config/passport.js')(passport, models.user);

//==========================
//Routes
//==========================

//Home Page
app.get("/", function(req,res){
    res.redirect("/dispatch");
});

//Signup, Login & Logout
require("./app/routes/authRoutes/auth.js")(app,passport);

// Dispatch Search/Edit/Add Route
require("./app/routes/dispatchRoutes/dispatch.js")(app);
//==================================================================//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!!");
});