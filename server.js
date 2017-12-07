var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


var PORT = process.env.PORT || 8080;

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true}));

//parse various different custom JSON type as JSON
app.use(bodyParser.json({ type: 'application/*json'}));

// parse some custom thing into a Buffer
app.use(bodyParser.json({ type: 'application/vnd.custom-type'}));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html'}));

require("./app/routing/html-route.js")(app);

app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});
