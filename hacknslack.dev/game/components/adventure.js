/**
 * An adventure is a grouped list of encounters.
 *
 * adventure = {
 *   // (array of strings) tags for this adventure. can be used to get specific encounter types
 *   tags: [],
 *
 *   // (array of effects) executed when adventure is complete
 *   completed: [
 *     {effect object},
 *     {effect object}
 *   ],
 *
 *   // (array of encounters)
 *   encounters: [
 *     { encounter object },
 *     { encounter object },
 *     ....
 *   ],
 * }
 */
var Adventure = {

  /**
   * Provides a template for an adventure object
   *
   * @returns {object} blank adventure
   */
  blueprint: function(){
    return {
      tags: [],
      completed: [],
      encounters: []
    }
  },

  /**
   * Create a new adventure object
   *    - allows a partial adventure (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object} adventure
   */
  create: function( stub ){
    var adventure = this.blueprint();
    var merge = require('deepmerge');

    // merge passed stub data with blank model
    if (typeof stub === 'object'){
      adventure = merge( adventure, stub );
    }

    return adventure;
  },

  /**
   * Generate random adventure
   *
   * @param num_of_encounters
   * @param difficulty
   * @returns {object} adventure
   */
  generate: function( num_of_encounters, difficulty ){
    var math = require('../math');
    var stubs = require('../static/encounters/arcane');
    var Encounter = require('../encounter/controller');
    var adventure = this.create();

    adventure.encounters = [];

    for ( var i = 0; i < num_of_encounters; i++){
      // get a random encounter stub
      var rand = math.random(0, stubs.length);
      var stub = stubs[ rand ];

      // make into full encounter
      var encounter = Encounter.create( stub );

      // add effects ?

      // add to adventure
      adventure.encounters.push(encounter);
    }

    return adventure;
  },

  nextEncounter: function( Game ){
    var i = Game.player.adventures.current_encounter;
    var next = i + 1;

    if ( Game.adventure.encounters[ next ]){
      // increment to next encounter
      Game.encounter = Game.adventure.encounters[ next ];
      Game.player.adventures.current_encounter = next;
    }
    else {
      // generate a new adventure
    }
  }
}

module.exports = Adventure;