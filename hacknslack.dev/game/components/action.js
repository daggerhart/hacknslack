/*

 An action is a simple object that provides the user with a possible
 choice.

 ---------------
 Template:

 var action = {
   cmd: "unique_slug",
   text: "Some action text that explains the option"
 }

 cmd - must be a global action, or refer to a method on the method providing the action
*/

var Action = {

  /**
   * Provides a template for an action object
   *
   * @returns {object} action
   */
  blueprint: function(){
    return {
      cmd: '',
      text: ''
    }
  },

  /**
   * Create a new action object
   *    - allows a partial action (called a stub) to populate the new object
   *
   * @param stub
   * @returns {object}
   */
  create: function( stub ){
    var action = this.blueprint();

    if (typeof stub === 'object'){
      var merge = require('deepmerge');

      action = merge( action, stub );
    }

    return action;
  }
}

module.exports = Action;