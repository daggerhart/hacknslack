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
 *
 *   // (string) - provide a new command for a global action.  cmd: must be set to a global command
 *   alias: ''
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
      context: '',
      //alias: '',
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
        // actions may alias global actions
        else if ( action.alias && Game.GameActions.actions[ action.cmd ] ) {
          // the alias is what the user can type, so
          Game.allowed_actions[ action.alias ] = Game.GameActions.actions[ action.cmd ];
          Game.allowed_actions[ action.alias ].context = 'global';
          Game.allowed_actions[ action.alias ].text = action.text;
        }
        else {
          Game.allowed_actions[ action.cmd ] = action;
          Game.allowed_actions[ action.cmd ].context = context;
        }
        console.log('got actions for context: ' + context);
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
      var method = '';

      if ( typeof context[ action.cmd ] === 'function' ){
        method = action.cmd;
      }

      context[ method ]( Game, function(){
        done();
      });
    }
  }
}

module.exports = Action;