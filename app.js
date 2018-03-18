var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104497f1c27ba5eab7bd_340.jpg"
  }
];

/**
 * Landing Page route
 */
app.get("/", function(req, res) {
  res.render("landing");
});

/**
 * Campgrounds-GET route
 */
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

/**
 * Campgrounds-POST route: handles the form from /campgrounds/new
 */
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

/**
 * Add new Campground route: submits a post request to Campgrounds-POST, which redirects to Campgrounds-GET
 */
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(3000, function() {
  console.log("Serving: YelpCamp");
});
