/**
 * A player is anyone who interacts with the game.
 * The player object stores the entire state of an individual player.
 *    Including:  characters and adventures w/ encounters
 *
 * player = {
 *   // (string) - provided by system when player interacts
 *   user_name: String,
 *
 *   // (string) - provided by system when player interacts*
 *   user_id: String,
 *
 *   // the player's character data
 *   characters: {
 *     // the player's current character
 *     current: {},
 *
 *     // (array of character objects) - the player's other characters
 *     others: []
 *   },
 *
 *   // the player's adventure data
 *   adventures: {
 *     // current encounter index for the current adventure
 *     current_encounter: Number,
 *
 *     // (adventure object) - current adventure
 *     current: {},
 *
 *     // (adventure object) - previous adventure (not sure we need this)
 *     previous: {}
 *   }
 * }
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Player = {

  /**
   * Provides a template for a player object
   *
   * @return {object} blank player
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
        current_encounter: Number,
        current: {},
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

/**
 * Mongoose schema
 */
var playerSchema = new Schema( Player.blueprint() );

/**
 * Mongoose model
 */
Player.model = mongoose.model( 'Player', playerSchema, 'players' );

module.exports = Player;