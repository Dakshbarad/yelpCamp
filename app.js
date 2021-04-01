
var express =require("express"),
	app= express(),
	bodyParser= require("body-parser"),
	mongoose= require("mongoose");

app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");


//Schema Setup
var campgroundSchema= new mongoose.Schema({
	name: String,
	image: String,
	desc: String
});

var Campground= mongoose.model("Campground",campgroundSchema);

// Campground.create({name:"Washington Slides",image:"https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",desc:"No Water Facility, Public toilets available ,Great Scenery."},
// 	function(err, campground){
// 	if (err) {
// 		console.log("Error found");
// 		console.log(err);
// 	}else{
// 		console.log("New campground added:");
// 		console.log(campground);
// 	}
// })

//Routes
app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	//res.render("campgrounds",{camps:camps}); 
	Campground.find({},function(err,allcampgrounds){
		if (err) {
			console.log(err);
		}else{
			res.render("index",{camps:allcampgrounds});
		}
	});
})

app.post("/campgrounds",function(req,res){
	var name= req.body.name;
	var image= req.body.image;
	var desc= req.body.desc;
	var newCampground= {"name":name,"image":image,"desc":desc};
	Campground.create(newCampground,function(err,newcampground){
		if (err) {
			console.log(err);
		} else {
			//Redirecting to the campgrounds page
			res.redirect("/campgrounds");	
		}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		if (err) {
			console.log(err);
		} else {
			res.render("show",{campground: foundcampground});
		}
	})

});

app.listen(3000,function(){
	console.log("YelpCamp server started on port 3000");
});
