var express = require("express");
var mongoose = require("mongoose");

// initialize express
var app = express();

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// set up handlebars as views and helper functions
var exphbs = require("express-handlebars");
var hbs = exphbs.create({
    defaultLayout: "main",
    helpers: {
        commentsCount: function (comments) {
            return comments.length || 0;
        }
    }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Import routes and give server access
var routes = require("./controllers/news");

app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});