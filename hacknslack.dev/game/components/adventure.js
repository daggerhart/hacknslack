/**
 * An adventure is a grouped list of encounters.
 *
 * adventure = {
 *
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
  generate: function( Game ){
    var tag1 = 'bandit';
    var tag2 = 'military';
    var num_of_encounters = 5;


    var fs = require("fs");
    var _ = require("lodash");
    var all_encounters = [];
    var filtered_encounters = [];
    var adventure = this.create();
    var used = [];

    // load encounter stubs
    fs.readdirSync( 'game/static/encounters' ).forEach(function(file) {
      var stubs = require( '../static/encounters/' + file );
      all_encounters = all_encounters.concat(stubs);
    });

    filtered_encounters = _.filter( all_encounters, function( enc ){
      return  ( enc.tags.indexOf( tag1 ) != -1 || enc.tags.indexOf( tag2 ) != -1 );
    });

    //console.log( filtered_encounters );
    //console.log('--- filtered encounters --- ^^');
    while ( used.length < num_of_encounters ){
      // get a random encounter stub
      var rand = Game.utils.Math.random(0, filtered_encounters.length);

      if ( used.indexOf( rand ) === -1 ) {
        // keep track of encounters we've selected
        used.push(rand);


        var stub = filtered_encounters[rand];

        // make into full encounter
        var encounter = Game.components.Encounter.create(stub);

        console.log('--------- CREATE NEW ENCOUNTER FROM STUB ------------');
        console.log(encounter);
        // add effects ?

        // add to adventure
        adventure.encounters.push(encounter);
      }
    }
    console.log(used);

    return adventure;
  },

  nextEncounter: function( Game ){
    var next = Game.character.current_encounter + 1;

    if ( Game.adventure.encounters[ next ]){
      // increment to next encounter
      Game.encounter = Game.adventure.encounters[ next ];
      Game.character.current_encounter = next;
    }
    else {
      // generate a new adventure
      console.log(' -- should generate a new adventure-- -');
      Game.adventure = this.generate( Game );
      Game.character.current_encounter = 0;
      //console.log(a);
    }
  }
}

module.exports = Adventure;