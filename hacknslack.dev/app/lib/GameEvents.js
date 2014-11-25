var events       = require('events');
var util         = require('util');

var GameEvents = new events.EventEmitter();

// wrapper for emit
GameEvents.doEvent = function( ){
  console.log('---- doing event: ' + arguments[0] );

  this.emit.apply(this, arguments );
}

module.exports = GameEvents;