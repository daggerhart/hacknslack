var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Player = {

  /**
   * Provides a template for a new player object
   */
  blueprint: function(){
    return {
      user_name: String,
      user_id: String,
      characters: {
        current: {},
        others: []
      },
      adventures: {
        // current encounter index
        current_encounter: Number,

        // current encounter object
        current: {},

        // previous encounter
        previous: {}
      }
    }
  },

  /**
   * Player.login looks for an existing player matching the request credentials
   *    and creates a new player if none is found
   *
   * @param req
   * @param callback
   */
  login: function( req, callback ) {
    // default player from request
    var requested_player = {
      user_name: req.query.user_name,
      user_id: req.query.user_id
    };

    var playerModel = this.model;

    playerModel.findOne(requested_player, function (err, found) {
      if (err) throw err;

      if (found) {

        // reload static adventures for their methods
        if (found.adventures.current.is_static) {
          found.adventures.current = require('../static/adventures/' + found.adventures.current.name);
        }

        callback( found );
      }
      else {
        var newPlayer = new playerModel(requested_player);
        newPlayer.adventures.current = require('../static/adventures/pcBuildProcess');
        newPlayer.adventures.current_encounter = 0;

        newPlayer.save(function (err, result) {
          if (err) throw err;

          callback( result );
        });
      }
    });
  }
}

// DB Schema
var playerSchema = new Schema( Player.blueprint() );

// DB Model, contains crud
Player.model = mongoose.model( 'Player', playerSchema, 'players' );

module.exports = Player;
