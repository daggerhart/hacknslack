
// PC constructor
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
      }
    };
  },

  /**
   * Create a new character object
   *    - allows a partial character (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object} character
   */
  create: function create( stub ) {
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