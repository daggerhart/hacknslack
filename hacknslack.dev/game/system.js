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

var tools     = require('tools');

var Player    = require('player');
var Character = require('character');
var Adventure = require('adventure');
var Encounter = require('encounter');
var _         = require('lodash');
var globalActions = require('globalActions');

module.exports = {

  /**
   * TODO: add input sanitization to ensure we're clean before continuing
   */
  sanitizeInput: function( req, res, next ){
    next();
  },

  /**
   * Convert a submitted input into an object with expectations
   */
  parseInput: function( req, res, next ) {
    var split_array = req.query.text.split(' '),
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

    req.systemParsedInput = input;

    if ( next ) {
      next();
    }
  },

  /**
   * Instantiate a Game and attach to request
   */
  gameInit: function( req, res, next ) {
    var Game = require('game');
    req.Game = Game.create( req );
    next();
  },

  /**
   * Load or create the current player
   */
  loadPlayer: function( req, res, next){

    // login or create a player
    Player.login( req, function( player ) {
      req.Game.player = player;
      console.log('- player loaded');

      next();
    });
  },

  /**
   * Load player's current character
   */
  loadCharacter: function( req, res, next){
    var player = req.Game.player;
    var character;

    if ( player.characters.current ) {
      character = Character.create( player.characters.current );

      if (!_.isEmpty(character.class)) {
        if (character.class.filename) {
          console.log("player class: " + character.class.name);
          character.class = tools.files.getClass(character.class.filename);
          console.log(req.Game.character.class);
        }
      }
      console.log('- character loaded');
    }
    else {
      character = Character.create();
      console.log('- character created');
    }

    req.Game.character = character;

    console.log('--------- CHARACTER -----------');
    console.log('---------------------------');
    console.log(req.Game.character);
    next();
  },

  /**
   * Load adventure from current character
   */
  loadAdventure: function( req, res, next){
    var character = req.Game.character;

    if ( !_.isEmpty( character.adventure ) ){
      req.Game.adventure = Adventure.create( character.adventure );
      console.log('- adventure loaded from character');
    }
    else {
      // assign character to first adventure
      var stub = tools.files.getAdventure('pcBuildProcess.js');
      req.Game.adventure = Adventure.create( stub );
    }

    console.log('--------- ADVENTURE -----------');
    console.log('---------------------------');
    console.log(req.Game.adventure);
    next();
  },

  /**
   * Load encounter from current adventure
   */
  loadEncounter: function( req, res, next){
    var character = req.Game.character;
    var adventure = req.Game.adventure;

    if ( adventure.encounters[ character.current_encounter ] ){
      req.Game.encounter = Encounter.create( adventure.encounters[ character.current_encounter ] );
      console.log('- encounter loaded from adventure');
    }
    else {
      req.Game.encounter = Encounter.create( adventure.encounters[0] );
      req.Game.character.current_encounter = 0;
      console.log('- encounter loaded from first encounter in adventure');
    }

    console.log('--------- ENCOUNTER -----------');
    console.log('---------------------------');
    console.log(req.Game.encounter);
    next();
  },

  /**
   * A new hook-thing to let objects respond to the game being loaded
   *
   * @param req
   * @param res
   * @param next
   */
  afterLoad: function( req, res, next ){
    var Game = req.Game;

    // allow adventure and encounter to respond to game after loading
    _.forEach([ Game.adventure, Game.encounter ], function( obj ){
      obj.afterLoad( Game );
    });

    next();
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

    if ( Game.encounter && ( Game.encounter.actions || Game.encounter.attack_alias ) ) {
      Game.getActions( Game.encounter, 'encounter');
    }

    if ( Game.adventure && Game.adventure.actions ) {
      Game.getActions( Game.adventure, 'adventure');
    }

    // character_class
    if ( Game.character && Game.character.class && Game.character.class.actions ){
      Game.allowed_actions.status = _.clone( globalActions.actions.status );
      Game.allowed_actions.status.context = 'global';

      Game.getActions( Game.character.class, 'character_class');
    }

    if ( Game.character && Game.character.equipment && Game.character.equipment.length ){
      //console.log(Game.character);
      Object.keys( Game.character.equipment ).forEach( function( key ){
        if ( Game.character.equipment[ key ].actions ) {
          Game.getActions( Game.character.equipment[key], 'equipment');
        }
      });
    }

    if ( Game.character && Game.character.items && Game.character.items.length ){
      Game.allowed_actions.item = _.clone( globalActions.actions.item );
      Game.allowed_actions.item.context = 'global';

      for( var i = 0; i < Game.character.items.length; i++ ) {
        if (Game.character.items[i].actions) {
          Game.getActions( Game.character.items[i], 'item');
        }
      }
    }

    //console.log("-----------------------------");
    console.log('------ ALLOWED ACTIONS ------');
    console.log("-----------------------------");
    console.log(Game.allowed_actions);
    //console.log("-----------------------------");
    //console.log("-----------------------------");
    //console.log("-----------------------------");

    // provide help action
    //Game.allowed_actions.help = require('GameActions').actions.help;
    //Game.allowed_actions.help.context = 'global';

    //console.log( Game );
    //console.log( Game.allowed_actions );

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
      Game.debug("doing action - " + Game.input.action );
      console.log('-------------- VALID ACTION -----------> ' + Game.input.action );
    }
    else {
      Game.debug("invalid action - " + Game.input.action );
      console.log('---!!!!!------- INVALID ACTION -----------> ' + Game.input.action );
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
      var action = Game.allowed_actions[ Game.input.action ];
      Game.doAction( action, function(){
        next();
      });
    }
    else {
      next();
    }
  },

  /**
   * Check the state of the game after execution.
   *
   * @param req
   * @param res
   * @param next
   */
  checkGameState: function( req, res, next ){
    var Game = req.Game;

    // character death
    if ( Game.character && Game.character.attributes.hp > 0 ){
      if ( Game.character.hp < 1 ) {
        Game.startAdventure('death.js');
        Game.character = Character.create();
      }
    }
    
    if ( Game.character && Game.character.xp) {
      if ( Game.character.xp > 100 ) {
      	Game.character.levelUp( Game );
      }
    }

    next();
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

    //Game.GameEvents.doEvent('saveGame', Game );

    var player = Game.player;
    player.characters.current = Game.character;
    player.characters.current.adventure = Game.adventure;
    player.characters.current.adventure.encounters[ player.characters.current.current_encounter ] = Game.encounter;

    // manually mark the character as modified to enforce saving
    // https://github.com/LearnBoost/mongoose/issues/1598
    player.markModified('characters.current');
    player.save(function(err, results, affected){
      if (err) throw err;

      console.log("-----------------------------");
      console.log('Game saved.: ' + affected );
      console.log("-----------------------------");

      Game.debug('On encounter ' + Game.character.current_encounter + ' of adventure ' + Game.adventure.title );
      //console.log(player.characters.current);

      next();
    });
  }
};

