var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");

var campground = [
    {name: "dog", image: "https://a57.foxnews.com/images.foxnews.com/content/fox-news/lifestyle/2017/12/01/dog-who-attempted-to-escape-shelter-in-viral-video-gets-adopted/_jcr_content/par/featured_image/media-0.img.jpg/931/524/1512148563312.jpg?ve=1&tl=1&text=big-top-image"},
    {name: "cat", image: "https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400"},
    {name: "bird", image: "http://www.ramojifilmcity.com/daytour/images-1/sigma-gallery/sun-conure.jpg"},
    {name: "mouse", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFo9VZs-zZ8bwMBYBOSNkzolz43JEc-cg6Uj4p1Sv3Ox7JLPr-lw"},
    {name: "rabbit", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsylzKGL_-MJi3-JP0xs3tEHlbLXsBPC8QBIQ7b-ugs1gGXgDSw"},
    {name: "Tiger", image: "http://cdn.tigers-world.com/wp-content/uploads/Bengal.jpg"}
];

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/camp", function(req, res){

    res.render("campground", {campdata: campground});
});

app.post("/camp", function(req, res){
    var name = req.body.name;
    var image = req.body.img;
    var newData = {name: name, image: image};
    campground.push(newData);
    res.redirect("/camp");
});

app.get("/camp/new", function(req, res) {
   res.render("new.ejs") ;
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!!");
})