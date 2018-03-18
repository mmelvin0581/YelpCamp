var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       name: "Granite Hill",
//       image:
//           "https://pixabay.com/get/ea34b4082bfd1c22d2524518b7444795ea76e5d004b0144394f3c57ca3eab4_340.jpg",
//       description: "This is a HUGE granite hill. No bathrooms. Beautiful granite!"
//     }, function (err, campground) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//       }
//     }
// );

/**
 * Landing Page route
 */
app.get("/", function (req, res) {
  res.render("landing");
});

/**
 * INDEX ROUTE - show all campgrounds
 */
app.get("/campgrounds", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

/**
 * CREATE - add new campground to database
 */
app.post("/campgrounds", function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

/**
 * NEW - show form to create new campground
 */
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

/**
 * SHOW - shows more information for one campground
 */
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with the provided id
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, function () {
  console.log("Serving: YelpCamp");
});
