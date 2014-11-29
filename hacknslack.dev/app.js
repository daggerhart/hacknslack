var express = require('express');
var app = express();
//var router = express.Router();
var fs = require('fs');

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');

// test db
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('mongoose connected');
});


app
  .use( logger)
  .use( express.static( __dirname + '/public' ))
  .use( function( req, res, next ){
    req.db = db;
    next();
  });

var System = require('./game/system');

/**
 * JSON developer endpoint
 */
app.use('/json',
  System.init,
  System.sanitizeInput,       // make sure input contains no illegal content
  System.parseGameInput,      // convert text input into an action
  System.loadGame,
  System.findAllowedActions,  // find current actions
  System.validateGame,        // ensure the action given is valid in this context
  System.executeGame,         // do the action
  System.saveGame,            // save the results
  System.findAllowedActions,  // find new actions in case they have changed
  System.buildHTMLOutput,     // output for this endpoint

  // final, return output
  function( req, res ){
    console.log("-----------------------------");
    console.log('Game complete.');
    console.log("-----------------------------");
    //console.log( req.Game );
    //console.log("-----------------------------");
    res.json( req.Game.output );
});


// route the root
app.get('/', function(req, res){
  res.sendFile('/index.html');
});

// route static files found in /public
app.get(/^(.+)$/, function(req, res) {
  res.sendfile('/' + req.params[0]);
});

// server
app.listen(3001);


function logger( req, res, next ){
  console.log('%s %s', req.method, req.url );
  next();
}

