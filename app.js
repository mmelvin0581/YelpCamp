var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://images.unsplash.com/photo-1474139242267-eef6daa88e13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1784214629de074de845bf3726857d67&auto=format&fit=crop&w=1487&q=80"
  },
  {
    name: "Granite Hill",
    image:
      "https://images.unsplash.com/photo-1499363536502-87642509e31b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b0f33e637f4bf5e38b990ee05fdcf318&auto=format&fit=crop&w=634&q=80"
  },
  {
    name: "Mountatin Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1486999619268-6aa409dbecd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f86046749a2c99bb728c6c72e4603f5a&auto=format&fit=crop&w=1350&q=80"
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
