require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);

//Setup environment
require('./config/enviroment.js')(app);
//custom NextJS
require('./custom-nextjs/custom')(app);

let port = 3006;
server.listen(process.env.PORT || port, function () { // always server
    console.log(`Listening on http://localhost:${port}`);
});
