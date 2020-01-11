var middleware = require("../middlewares/");

var exports = module.exports = {};

//Search
exports.search = function(req, res) {
    var date=middleware.dateConversion(req.query.date);
    // models.sequelize.query(q,{ raw: true, replacements: [date]}).then(function(){console.log("query success");}).then(function(err, result){if(err) throw err;data=result; res.render("dispatch_show", {data:data, formDate:formDate});});
    middleware.connection.query(middleware.select(),[date, date, date],function(err, data){
        if(err) throw err;
        res.render("./dispatch/dispatch_show", {data:data, formDate:req.query.date});
    });
};

// Add
exports.add = function(req,res){
    res.send("This is Add new Page!");
};

//Edit
exports.edit = function(req,res){
    var date=middleware.dateConversion(req.query.date);
    console.log(req.query.date);
    middleware.connection.query(middleware.select(),[date, date, date],function(err, data){
        if(err) throw err;
        res.render("./dispatch/edit", {data:data, formDate:req.query.date});
    });
};

//Update
exports.update = function(req,res){
    console.log(req.body.genba);
    res.send("These will be updated in database: "+req.body.genba);
};