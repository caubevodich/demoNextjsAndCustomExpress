var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
module.exports = function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    //express validator
    app.use(express.json());
}