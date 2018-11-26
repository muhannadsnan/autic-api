var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // configure the app to use bodyParser()
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(express.logger('dev'))
//ENV
var environment = require('./environment/environment')
global.ENV = environment.env1;
// ROUTES
var routing = require('./routes');
app.use(routing.devs);
app.get('/', (req, resp)=>{
    resp.send(`<h1>${ENV.db.messageConnected} on port:<br> ${ENV.port}</h1>`);
});
// LISTEN
app.listen(ENV.port, ()=> console.log(`Node running on port ${ENV.port}...`) );