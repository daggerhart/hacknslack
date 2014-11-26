/*

 An effect is an object that can automatically modify the game state.
 Generally used to deal damage, heal HP, or provide item drops

 ----------------
 Template:

 var effect = {
   amount: N,
   type: ( heal | dmg | item | bonus | attack | specific item | message ),
   attribute_types: ( body | mind | spirit )
 }
 */

var Effect = {

  /**
   * Provides a template for an effect object
   *
   * @returns {object} blank effect
   */
  blueprint: function(){
    return {
      amount: 0,
      type: '',
      attribute_types: ''
    }
  },

  /**
   * Create a new effect object
   *    - allows a partial effect (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object} effect
   */
  create: function( stub ){
    // blank model
    var effect = this.blueprint();

    // merge passed stub data with blank model
    if (typeof stub === 'object'){
      var merge = require('deepmerge');

      effect = merge( effect, stub );
    }

    return effect;
  }
}

module.exports = Effect;