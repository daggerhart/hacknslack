/**
 *
 * character = {
 *   // (string) - unique character class
 *   class: String,
 *
 *   // (Number) - character level
 *   level: 1,
 *
 *   // (array of strings) - refer to global actions this character can perform
 *   actions: ['status', 'equip'],
 *
 *   // (object) of specific properties, each property's value is an item object
 *   equipment: {
 *     weapon: {item},
 *     armor: {item},
 *     gear: {item}
 *   },
 *
 *   // (object) of specific properties, each property's value is a number
 *   attributes: {
 *     body: Number,
 *     mind: Number,
 *     spirit: Number,
 *     hp: Number
 *   },
 *
 *   // (array) of item objects
 *   items:[
 *     {item},
 *     {item}
 *   ]
 * }
 */
var Character = {

  /**
   * Provides a template for a character object
   *
   * @returns {object} blank character
   */
  blueprint: function(){
    return {
      class: String,
      level: 1,
      actions: ['status', 'equip'],
      equipment: {
        weapon: {},
        armor: {},
        gear: {}
      },
      attributes: {
        body: Number,
        mind: Number,
        spirit: Number,
        hp: Number
      },
      items: []
    };
  },

  /**
   * Create a new character object
   *    - allows a partial character (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object} character
   */
  create: function ( stub ) {
    var character = this.blueprint();

    if (typeof stub === 'object'){
      var merge = require('deepmerge');

      character = merge( character, stub );
    }
    return character;
  }

  /*/ hook into loadGame event
  Game.GameEvents.on('loadGame', function( Game ){
    console.log('character loadGame');
  });

  // hook into saveGame event
  Game.GameEvents.on('saveGame', function ( Game ){

  });
  // */
}

module.exports = Character;