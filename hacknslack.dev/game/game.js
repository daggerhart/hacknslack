var GameActions = require('./lib/GameActions');
var GameEvents  = require('./lib/GameEvents');
var fs          = require('fs');

var Game = {

  /**
   * Provides a template for a game object
   *
   * @returns {object} blank game
   */
  blueprint: function(){
    return {
      // global methods
      GameActions: GameActions,
      GameEvents: GameEvents,
      // game components
      components: {},
      // game utilities
      utils: {},

      // request
      raw_input: '',
      query: {},

      // single game specific
      allowed_actions: {}, // dynamically populated by system
      player: {},
      character: {},
      adventure: {
        current_encounter: 0,
        encounters: {}
      },
      encounter: {},

      // response
      output: {
        payload: "", // slack expects a payload
        data: [],    // data that will be processed into the payload for output
        debug: []
      }
    }
  },

  /**
   * Create a new game object from the request query
   *
   * @param req
   * @returns {object}
   */
  create: function ( req ) {
    var game = this.blueprint();

    game.raw_input = req.query.text;
    game.query = req.query;

    game.components = {
      Action:    require('./components/action'),
      Adventure: require('./components/adventure'),
      Character: require('./components/character'),
      Effect:    require('./components/effect'),
      Encounter: require('./components/encounter'),
      Player:    require('./components/player')
    };

    game.utils = {
      Math: require('./lib/math')
    };

    return game;
  }
}

module.exports = Game;