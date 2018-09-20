var express = require('express');
var app = express();
var body = require('body-parser');
var env = require('./environment/environment')
var envDB = env.db;
var catsController = require("./controllers/catsController");

// ROUTES
var routing = require('./routes');
app.use(routing.cats);
app.get('/autic', catsController.index);
app.get('/', (req, resp)=>{
    resp.send("<h1>Hallooooooo !</h1>");
});

// LISTEN
app.listen(envDB.port);
console.log(`Node running on port ${envDB.port}...`);