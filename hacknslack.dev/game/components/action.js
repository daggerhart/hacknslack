/**
 * An action is a simple object that provides the user with a possible
 * choice.
 *
 * action = {
 *   // (string) - must be a global action, or refer to a method on the method providing the action
 *   cmd: "unique_slug",
 *
 *   // (string) - description of the action
 *   text: "Some action text that explains the option",
 *
 *   // (string) - game generated context for action execution
 *   context: '',
 *
 *   // (bool) - actions can be hidden from the user.
 *   // Useful for game utility actions such as "help"
 *   silent: false,
 * }
 *
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
      text: '',
      content: '',
      silent: false
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
  },

  /**
   * Get the actions provided by an object and place into Game.allowed_actions
   *
   * @param obj
   */
  getActions: function( Game, obj, context ) {
    if ( obj.actions ) {
      for (var i = 0; i < obj.actions.length; i++) {
        // can be a string of action object
        var action = obj.actions[i];

        // strings are references to global actions
        if (typeof action === 'string' && Game.GameActions.actions[ action ]) {
          Game.allowed_actions[ action ] = Game.GameActions.actions[ action ];
          Game.allowed_actions[ action ].context = 'global';
        }
        else {
          Game.allowed_actions[ action.cmd ] = action;
          Game.allowed_actions[ action.cmd ].context = context;
        }
      }
    }
  },

  /**
   * Execute a the current Game action
   *
   * @param Game
   * @param done
   */
  doAction: function( Game, done ){
    var action = Game.allowed_actions[ Game.input.action ];

    var context_map = {
      global: Game.GameActions,
      player: Game.player,
      adventure: Game.adventure,
      character: Game.character,
      encounter: Game.encounter
      // TODO equipment and items
    };

    // get the contextual object of this action
    if ( context_map[ action.context ] ) {
      var context = context_map[ action.context ];

      // see if there is a method in this context
      if ( typeof context[ action.cmd ] === 'function' ){
        context[ action.cmd ]( Game, function(){
          done();
        });
      }
    }
  }
}

module.exports = Action;