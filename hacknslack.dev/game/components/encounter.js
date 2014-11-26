/**
 * An encounter is a step (or state) in the player's game.
 *
 * encounter = {
 *   // (string)
 *   title: "What do you want to to?",
 *
 *   // (string)
 *   desc: "You are presented with the following choices...",
 *
 *   // (array of strings)
 *   tags: ['monster', 'arcane'],
 *
 *   // (array of action objects or strings that reference global actions) - this encounter’s contextual actions
 *   actions: [
 *     {
 *       cmd: "attack",
 *       text: "Attack !"
 *     },
 *     { action object },
 *     'attack' // as a string to reference a global action
 *   ],
 *
 *   // (number) - difficulty of encounter
 *   challenge_rating: 3,
 *
 *   // (string) - pc attribute the difficulty challenges
 *   challenge_attribute: 'body',
 *
 *   // (mixed) - array of effect objects or a callback
 *   success : [
 *     { effect object },
 *     { effect object }
 *   ],
 *
 *   // (mixed) - array of objects or a callback
 *   fail : [
 *     { effect object },
 *     { effect object }
 *   ]
 * }
 */

var Encounter = {

  /**
   * Provides a template for an encounter object
   *
   * @returns {object} blank encounter
   */
  blueprint: function(){
    var encounter = {
      title: '',
      desc: '',
      actions: [],
      tags: [],
      challenge: {
        rating: 0,
        attribute: ''
      },
      success: [],
      fail: []
    }

    return encounter;
  },

  /**
   * Create a new encounter object
   *    - allows a partial encounter (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object} encounter
   */
  create: function( stub ){

    // new blank model
    var encounter = this.blueprint();

    // merge passed stub data with blank model
    if (typeof stub === 'object'){
      var merge = require('deepmerge');

      encounter = merge( encounter, stub );
    }

    return encounter;
  },

  /**
   * Execute a the current Game action
   *
   * @param Game
   * @param done
   */
  doAction: function( Game, done ){
    var player       = Game.player;
    var pc           = Game.pc;
    var encounter    = Game.encounter;
    var input_action = Game.input.action;
    var context      = Game.allowed_actions[ input_action ];

    //console.log(context);
    //console.log(encounter);

    // find action
    for( var i = 0; i < encounter.actions.length; i++ ){
      // current action
      if ( encounter.actions[ i ].cmd == input_action ){
        var action = encounter.actions[ i ];

        //console.log('found matching action');
        //console.log(action);

        // execute callback action directly
        if ( typeof action.callback === 'function'){
          //console.log('action has a callback');
          action.callback( Game, done );
        }
        else if ( encounter[ action.cmd ] ) {
          //console.log('action is a method on the encounter object');
          encounter[ action.cmd ]( Game, done);
        }
        else {
          console.log('none of the above');
          console.log( action );
          console.log(encounter);
        }
      }
    }
  }
}

module.exports = Encounter;