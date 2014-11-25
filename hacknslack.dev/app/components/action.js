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

  blueprint: function(){
    return {
      cmd: '',
      text: ''
    }
  },

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