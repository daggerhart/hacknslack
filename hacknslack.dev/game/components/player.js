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
      }
    }
  },

  create: function( stub ){
    var player = this.blueprint();

    if (typeof stub === 'object'){
      var merge = require('deepmerge');

      player = merge( player, stub );
    }

    return player;
  },

  /**
   * Player.login looks for an existing player matching the request credentials
   *    and creates a new player if none is found
   *
   * @param req
   * @param callback
   */
  login: function( req, callback ) {
    var _this = this;

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
        if (found.characters.current.adventure.is_static) {
          found.characters.current.adventure = require('../static/adventures/' + found.characters.current.adventure.name);
          console.log('loaded static adventure: ' + found.characters.current.adventure.name );
        }

        callback( found );
      }
      else {
        var new_player = _this.create( requested_player );
        var newPlayer = new playerModel( new_player );
        var Character = require('./character');

        // load character build process and set
        newPlayer.characters.current = Character.create();
        newPlayer.characters.current.adventure = require('../static/adventures/pcBuildProcess');
        newPlayer.characters.current.current_encounter = 0;

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
