var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // configure the app to use bodyParser()
//ENV
var environment = require('./environment/environment')
global.ENV = environment.env1;
//CONTROLLERS
var devsController = require("./controllers/devsController");
// ROUTES
var routing = require('./routes');
app.use(routing.devs);
app.get('/devices', devsController.index);
app.get('/', (req, resp)=>{
    resp.send(`<h1>${ENV.db.messageConnected} on port:<br> ${ENV.port}</h1>`);
});
// LISTEN
app.listen(ENV.port, ()=> console.log(`Node running on port ${ENV.port}...`) );