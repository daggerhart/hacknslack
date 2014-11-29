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
      if ( player.characters.current.adventure ){
        Game.adventure = player.characters.current.adventure;

        // current encounter
        if ( player.characters.current.adventure.encounters[ player.characters.current.current_encounter ] ){
          Game.encounter = player.characters.current.adventure.encounters[ player.characters.current.current_encounter ];
        }
        else if ( player.characters.current.adventure.encounters[0] ) {
          Game.encounter = player.characters.current.adventure.encounters[0];
        }
      }

      //Game.GameEvents.doEvent('loadGame', Game );

      if ( next ){
        next();
      }
    });
  },

  /**
   *  Get actions from context:
   *      Game.encounter,
   *      Game.adventure,
   *      Game.character,
   *      Game.character.equipment,
   *      Game.character.items
   *      GlobalActions
   *
   * @param req
   * @param res
   * @param next
   */
  findAllowedActions: function ( req, res, next ) {
    var Game = req.Game;
    Game.allowed_actions = {};

    if ( Game.adventure && Game.adventure.actions ) {
      Game.components.Action.getActions( Game, Game.adventure, 'adventure');
    }

    if ( Game.encounter && Game.encounter.actions) {
      Game.components.Action.getActions( Game, Game.encounter, 'encounter');
    }

    if ( Game.character && Game.character.actions ){
      Game.components.Action.getActions( Game, Game.character, 'character');
    }

    if ( Game.character && Game.character.equipment.length ){
      console.log(Game.character);
      Object.keys( Game.character.equipment ).forEach( function( key ){
        if ( Game.character.equipment[ key ].actions ) {
          Game.components.Action.getActions(Game, Game.character.equipment[key], 'equipment');
        }
      });
    }

    if ( Game.character && Game.character.items ){
      for( var i = 0; i < Game.character.items.length; i++ ) {
        if (Game.character.items[i].actions) {
          Game.components.Action.getActions(Game, Game.character.items[i], 'item');
        }
      }
    }

    // provide help action
    Game.allowed_actions.help = Game.GameActions.actions.help;
    Game.allowed_actions.help.context = 'global';

    //console.log( Game );
    //console.log( Game.allowed_actions );

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

    if ( Game.input.action && Game.allowed_actions[ Game.input.action ] ) {
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

    // TODO: execute action within context

    if ( Game.input.valid ) {
      Game.components.Action.doAction( Game, function(){
        next();
      });
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
    player.characters.current = Game.character;
    player.characters.current.adventure = Game.adventure;

    console.log('--------- !! these should match !! ------------');
    console.log(Game.character);
    console.log(player.characters.current);
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
    if ( Game.output.data.length ) {
      Game.output.data.push('<hr style="margin: 0; border-bottom: 1px dashed #bbb">');
    }
    Game.output.data.push( Game.encounter.title );
    Game.output.data.push( Game.encounter.desc );

    Object.keys( Game.allowed_actions ).forEach(function( key ){
      if ( ! Game.allowed_actions[ key ].silent ) {
        Game.output.data.push( '- ' + key + ': ' + Game.allowed_actions[ key ].text );
      }
    });
    // end

    // provide current character info on each action
    if ( Game.character.attributes ) {
      Game.output.data.unshift('<div style="border-bottom: 1px dashed #bbb;">Class: ' + Game.character.class + ' -- HP: ' + Game.character.attributes.hp + '</div>' );
    }

    // should be an array of stuff to output
    payload = Game.output.data.join('<br>');

    payload+= '<hr style="border-bottom: 2px solid blue">';

    req.Game.output.payload = payload;

    next();
  }
}

