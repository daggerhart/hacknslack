var express  = require('express');
var app      = express();
//var router   = express.Router();
var fs       = require('fs');
var mongoose = require('mongoose');
var System   = require('./game/system');
var tools    = require('./game/node_modules/tools.js');

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
  .use( express.static( __dirname + '/public' ));


/**
 * JSON developer endpoint
 */
app.use('/json',
  function( req, res, next ){
    req.db = db;
    next();
  },
  System.sanitizeInput,       // make sure input contains no illegal content
  System.parseInput,      // convert text input into an action
  System.gameInit,
  System.loadPlayer,
  System.loadCharacter,
  System.loadAdventure,
  System.loadEncounter,
  System.findAllowedActions,  // find current actions
  System.afterLoad,           // allow main objects to respond to game after it has loaded
  System.validateGame,        // ensure the action given is valid in this context
  System.executeGame,         // do the action
  System.checkGameState,      // deal with the outcome of the action
  System.saveGame,            // save the results
  System.afterLoad,           // allow main objects to respond to game after it has loaded
  System.findAllowedActions,  // find new actions in case they have changed

  // final, return output
  function( req, res ){

    var output = {
      character: req.Game.character,
      adventure: req.Game.adventure,
      encounter: req.Game.encounter,
      output:   req.Game.messages.output,
      debug:   req.Game.messages.debug,
      errors:   req.Game.messages.errors,
      actions:   req.Game.allowed_actions
    };

    // encounter image
    if ( req.Game.encounter.image ){
      output.image = tools.getImageUrl( req.Game.encounter.image );
    }

    console.log("-----------------------------");
    console.log('Game complete.');
    console.log("-----------------------------");
    //console.log( req.Game );
    //console.log("-----------------------------");
    res.json( output );
});

// server
app.listen(3001);


function logger( req, res, next ){
  console.log('%s %s', req.method, req.url );
  next();
}

