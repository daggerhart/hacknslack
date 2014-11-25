/*
 *  The GameSystem is a group of middleware methods that handle
 *    the necessary flow of the user's interaction with the game.
 *
 *  Flow:

   GameSystem.init,
   GameSystem.playerLogin,
   GameSystem.loadGame,
   GameSystem.findGameActions,
   GameSystem.parseGameInput,
   GameSystem.validateGame,
   GameSystem.executeGame,
   GameSystem.buildOutput,
   GameSystem.saveGame,

 */

// What we expect from slack
/*
 token=YHuaZqXEBtuCpcAJV278UKqc
 team_id=T0001
 channel_id=C2147483705
 channel_name=test
 timestamp=1355517523.000005
 user_id=U2147483697
 user_name=Steve
 text=googlebot: What is the air-speed velocity of an unladen swallow?
 trigger_word=googlebot:
 */

module.exports = {

  /**
   * Instantiate a Game and attach to request
   *
   * @param req
   * @param res
   * @param next
   */
  init: function( req, res, next ) {
    var Game = require('./game');
    req.Game = Game.create( req );

    next();
  },

  /**
   * Load the pc, adventure, encounter and more... if needed
   *
   * @param req
   * @param res
   * @param next
   */
  loadGame: function( req, res, next ) {
    var Game = req.Game;

    console.log('-------- load game ---------');

    // login or create a player
    Game.components.Player.login( req, function( player ){

      Game.player = player;

      // current character
      if ( player.characters.current ){
        Game.character = player.characters.current;
      }

      // current adventure
      if ( player.adventures.current ){
        Game.adventure = player.adventures.current;

        // current encounter
        if ( player.adventures.current.encounters[ player.adventures.current_encounter ] ){
          Game.encounter = player.adventures.current.encounters[ player.adventures.current_encounter ];
        }
      }

      //Game.GameEvents.doEvent('loadGame', Game );

      if ( next ){
        next();
      }
    });
  },

  /**
   *  Get context from:
   *      Game.encounter.actions,
   *      Game.adventure.actions,
   *      Game.character,
   *      Game.character.equipment,
   *      GlobalActions
   *
   * @param req
   * @param res
   * @param next
   */
  findAllowedActions: function ( req, res, next ) {
    var Game = req.Game;
    var actions = {};


    if ( Game.adventure.actions ) {
      for( var i = 0; i < Game.adventure.actions.length; i++ ){
        // strings are references to global actions
        if ( typeof Game.adventure.actions[ i ] === 'string'){
          actions[ Game.adventure.actions[ i ] ] = 'global';
        }
        else {
          actions[ Game.adventure.actions[ i ].cmd ] = 'adventure';
        }
      }
    }

    if ( Game.encounter && Game.encounter.actions) {
      for( var i = 0; i < Game.encounter.actions.length; i++){
        // strings are references to global actions
        if ( typeof Game.encounter.actions[ i ] === 'string'){
          actions[ Game.encounter.actions[ i ] ] = 'global';
        }
        else {
          actions[ Game.encounter.actions[ i ].cmd ] = 'encounter';
        }
      }
    }

    if ( Game.character && Game.character.actions ){
      // what if the pc had actions of their own? wtF?
      for( var i = 0; i < Game.character.actions.length; i ++){
        // strings are references to global actions
        if ( typeof Game.character.actions[ i ] === 'string'){
          actions[ Game.character.actions[ i ] ] = 'global';
        }
        else {
          actions[ Game.character.actions[ i ].cmd ] = 'character';
        }
      }
    }

    if ( Game.character && Game.character.equipment ){
      // handle actions provided by equipment
    }

    if ( Game.character && Game.character.items ){
      // handle actions provided by items
    }

    Game.allowed_actions = actions;

    if ( next ) {
      next();
    }
  },

  /**
   * Convert a submitted input into an object with expectations
   *
   * @param req
   * @param res
   * @param next
   */
  parseGameInput: function( req, res, next ) {
    var Game = req.Game;
    var split_array = Game.raw_input.split(' '),
      input = {
        context: '',
        words: [],       // split and trimmed
        action: '',      // first word
        target: false,   // second word
        valid: false,    // action is valid
        executed: false  // action has been executed
      };

    // loop through words and ensure legitimacy
    for ( var i = 0; i < split_array.length; i++ ) {
      if ( split_array[ i ] ) {
        input.words.push( split_array[ i ] );
      }
    }

    // the action is a special thing
    input.action = input.words[0];

    // maybe the target is something special as well ?
    if (input.words[1]) {
      input.target = input.words[1];
    }

    Game.input = input;

    if ( next ) {
      next();
    }
  },

  /**
   * Ensure the action exists and is contextually allowed
   *
   * @param req
   * @param res
   * @param next
   */
  validateGame: function( req, res, next ) {
    var Game = req.Game;

    if ( Game.input.action && Game.allowed_actions[ Game.input.action] ) {
      Game.input.valid = true;
      Game.input.context = Game.allowed_actions[ Game.input.action ];
      Game.output.debug.push("doing action - " + Game.input.action );
    }
    else {
      Game.output.debug.push("invalid action - " + Game.input.action );
    }

    if (next) {
      next();
    }
  },

  /**
   * Execute valid input
   *
   * @param req
   * @param res
   * @param next
   */
  executeGame: function( req, res, next ) {
    var Game = req.Game;
    if ( Game.input.valid ) {
      // look for action in global scope
      if ( Game.GameActions[ Game.input.action ] ) {

        Game.GameActions[ Game.input.action ](Game, function () {
          Game.input.executed = true;
          next();
        });

      }
      // do the encounter
      else {

        Game.components.Encounter.doAction( Game, function(){
          next();
        });

      }
    }
    else {
      next();
    }
  },

  /**
   * Save the state of the game
   *
   * @param req
   * @param res
   * @param next
   */
  saveGame: function( req, res, next ) {
    var Game = req.Game;
    // save pc data

    console.log('----------- save game --------------');
    //Game.GameEvents.doEvent('saveGame', Game );

    var player = Game.player;
    player.adventures.current = Game.adventure;
    player.characters.current = Game.character;

    // manually mark the character as modified to enforce saving
    // https://github.com/LearnBoost/mongoose/issues/1598
    player.markModified('characters.current');
    player.save(function(err, results, affected){
      if (err) throw err;

      console.log('player save !! -- affected: ' + affected);
      next();
    });

  },

  /**
   * Make output for environment
   *
   * @param req
   * @param res
   * @param next
   */
  buildHTMLOutput: function( req, res, next ){
    var Game = req.Game;

    // TODO move this to somewhere better
    // append allowed actions to every output
    Game.output.data.push( Game.encounter.title );
    Game.output.data.push( Game.encounter.desc );

    Object.keys( Game.allowed_actions).forEach(function( key ){
      Game.output.data.push( '- ' + key );
    });
    // end

    // provide current character info on each action
    if ( Game.character.attributes ) {
      Game.output.data.unshift('Class: ' + Game.character.class + ' -- HP: ' + Game.character.attributes.hp );
    }

    // should be an array of stuff to output
    payload = Game.output.data.join('<br>');

    req.Game.output.payload = payload;

    next();
  }
}

