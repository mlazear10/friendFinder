var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});

// creates application/json parser
var jsonParser = body.parser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false});