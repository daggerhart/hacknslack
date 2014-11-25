var Adventure = {

  blueprint: function(){
    return {
      encounters: []
    }
  },

  /**
   *
   * @param stub
   * @returns {exports}
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
   * @returns {exports}
   */
  generate: function( num_of_encounters, difficulty ){
    var math = require('../math');
    var stubs = require('../static/encounters/monsters');
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
  }
}

module.exports = Adventure;