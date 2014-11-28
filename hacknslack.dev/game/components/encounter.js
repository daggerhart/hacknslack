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
  }
}

module.exports = Encounter;