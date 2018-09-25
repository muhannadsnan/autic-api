var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// configure the app to use bodyParser()
app.use(bodyParser.json());
var environment = require('./environment/environment')
global.ENV = environment.env1;
var catsController = require("./controllers/catsController");

// ROUTES
var routing = require('./routes');
app.use(routing.cats);
app.get('/autic', catsController.index);
app.get('/', (req, resp)=>{
    resp.send(`<h1>${ENV.db.messageConnected} on port:<br> ${ENV.port}</h1>`);
});

// LISTENS
app.listen(ENV.port);
console.log(`Node running on port ${ENV.port}...`);