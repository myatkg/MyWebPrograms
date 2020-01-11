var mysql           = require("mysql"),
    bCrypt = require('bcrypt-nodejs'),
    middlewareObj   ={};
    
middlewareObj.isLoggedIn = function (req, res, next) { //To Check the user is logged in
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

middlewareObj.haveLoggedIn = function(req, res, next) { //To prevent logged in Users from going back to login page unless they are logged out
        if (req.isAuthenticated()){
            res.redirect('back');
        }
        else {
            return next();
        }
};
    
middlewareObj.generateHash = function(hash) {
            return bCrypt.hashSync(hash, bCrypt.genSaltSync(8), null);
            };
            
middlewareObj.isValidHash = function(primaryHash, inputHash) {
                return bCrypt.compareSync(inputHash, primaryHash);
            };

middlewareObj.dateConversion = function (date){
    if(date==undefined){
        date="";
    } else if(date!="") {
        date=date.replace(/月|日|年/gi,"-");
        var year=date.slice(6);
        date=year.concat(date);
        date=date.slice(0,-6);
        date=date.concat('%');
    }
    return date;
};

//Making Connection of MySQL database to make query
middlewareObj.connection = mysql.createConnection({ host  :'localhost', user  : 'myatkaung', database : 'fuji', multipleStatements: true});

//Preparing for Dispatch Select, Update and Insert Queries
//Select
middlewareObj.select = function(){
    var q       ="select truck_company from delivery join trucks on delivery.truck_id=trucks.id join products on delivery.product_id=products.pid join truck_company on truck_company.id=trucks.truck_company_id where deli_date like ? group by truck_company;";
        q       +="select truck_no from delivery join trucks on delivery.truck_id=trucks.id join products on delivery.product_id=products.pid join truck_company on truck_company.id=trucks.truck_company_id where deli_date like ? group by truck_id order by truck_company, truck_id;";
        q       +="select truck_company, truck_no, deli_date, product_name, no as qty from delivery join trucks on delivery.truck_id=trucks.id join products on delivery.product_id=products.pid join truck_company on truck_company.id=trucks.truck_company_id where deli_date like ? order by truck_company;";
    return q;
};
//Update
middlewareObj.update = function(){
    
};


module.exports = middlewareObj;