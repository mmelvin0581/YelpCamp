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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       name: "Granite Hill",
//       image:
//           "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
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
 * Campgrounds-GET route
 */
app.get("/campgrounds", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

/**
 * Campgrounds-POST route: handles the form from /campgrounds/new
 */
app.post("/campgrounds", function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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
 * Add new Campground route: submits a post request to Campgrounds-POST, which redirects to Campgrounds-GET
 */
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.listen(3000, function () {
  console.log("Serving: YelpCamp");
});
