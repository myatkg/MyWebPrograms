var express = require("express");
var app=express();
var request = require("request");
var ejs = require("ejs");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res){
    var searchedterm = req.query.movieSearched;
    var url = "http://www.omdbapi.com/?s="+searchedterm +"&apikey=thewdb";
   request(url, function(error, response, body){
      if(!error && response.statusCode==200){
         var parsedData = JSON.parse(body);
         res.render("results.ejs", {data: parsedData});
          console.log("error="+error);
          //console.log(parsedData["Search"]);
      } 
   });
});



app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server started");
});