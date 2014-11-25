
// PC constructor
var Character = {

  blueprint: function(){
    return {
      class: String,
      level: 1,
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