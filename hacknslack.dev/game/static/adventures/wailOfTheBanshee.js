/*

A small coastal village is being plagued by a banshee.
The player needs to solve the banshees riddle before it kills again.
Already, 8 people have been killed by the Banshee.  It is said that she kills every 3 days.

There are 4 places to go in town.

 - Le' Item Shoppe
   - run by Tom Tavernkeeperson
   - father of Jerry
   - accused of murdering his wife Agnei, and summoning the banshee

 - Blister's Blessing Emporium
    - owned by a Blister Halfman - the halfling

 - Psychic Laundry Services
    - run by Marie the Clairvoyant
    - she did it. sacrificed Agnei Tavernkeeperson to the Sea Demon

 - Tavern's Place
    - run by Jerry Tavernkeeperson
    - blames dad, Tom, for mother's death


 */
var Encounter = require('encounter');
var _ = require('lodash');
var globalActions = require('globalActions');
var tools = require('tools');

/**
 * Goto a specific encounter
 *
 * @param Game
 * @param done
 */
function actionGoTo( Game, done ){
  var encounterIndex = Game.input.target;

  if ( Game.adventure.canTravel ) {
    if (Game.adventure.encounters[encounterIndex]) {
      var encounter = Game.adventure.encounters[encounterIndex];

      if (encounter.canVisit) {
        Game.encounter = Encounter.create(encounter);
        Game.character.current_encounter = encounterIndex;

        Game.output("You go to the " + Game.encounter.title);
      }
    }
  }
  else {
    Game.output("What good would that do? It's too late to make a difference.");
  }
  done();
}

/**
 * Show the encounter logs for this adventure
 *
 * @param Game
 * @param done
 */
function actionShowLog( Game, done ){
  _.forEach( Game.adventure.adventureLog, function( log ){
    Game.output( log );
    Game.output( '-----' );
  });

  done();
}

/**
 * Show encounters in this adventure that set canVisit = true
 *
 * @param Game
 * @param done
 */
function actionShowMap( Game, done ) {
  if ( Game.adventure.canTravel ) {

    _.forEach(this.encounters, function (encounter, key) {
      if (encounter.canVisit) {
        Game.output('-' + key + ' : ' + encounter.title);
      }
    });
  }
  else {
    Game.output("There's nowhere left to go.");
  }
  done();
}

/**
 * Get free info from this encounter
 *
 * @param Game
 * @param done
 */
function actionGatherInfo( Game, done ){
  // init the adventureLog if it doesn't exist
  if ( !_.isArray( Game.adventure.adventureLog )){
    Game.adventure.adventureLog = [];
  }

  // only gather info once
  Game.output( this.freeInfo );

  // add info to the log if they have not already gathered this info
  if ( ! Game.adventure.encounters[ Game.character.current_encounter ].hasGatheredInfo ) {
    Game.adventure.adventureLog.push( this.title + ' - ' + this.freeInfo );
  }

  // remember that we added this gatherinfo to the log
  Game.adventure.encounters[ Game.character.current_encounter ].hasGatheredInfo = true ;

  done();
}

/**
 * An attack that a player may only attempt once
 *
 * @param Game
 * @param done
 */
function actionAttackOnce( Game, done ){
  // init the adventureLog if it doesn't exist
  if ( !_.isArray( Game.adventure.adventureLog )){
    Game.adventure.adventureLog = [];
  }

  if ( Game.encounter.hasAttacked ) {
    Game.output("You don't learn anything new.");
    done();
  }
  else {
    // hidden info doesn't attach correct to the encounter as an effect object because of javascript stuff
    // do it here so that it works right
    Game.encounter.success.push({ value: this.hiddenInfo, type: 'output' });

    // do an attack action
    var action = _.clone(globalActions.actions.attack);
    action.context = 'global';

    // remember that we've done this encounter's attack
    Game.adventure.encounters[ Game.character.current_encounter ].hasAttacked = true;
    Game.adventure.adventureLog.push( this.title + ' - ' + this.hiddenInfo );

    Game.doAction(action, function () {
      done();
    });
  }
}

/**
 * Show the 'wares' within the current encounter
 *
 * @param Game
 * @param done
 */
function actionShowWares( Game, done ){

  _.forIn( this.wares, function( ware, key ){
    if ( ! ware.sold ) {
      Game.output( '-' + key + ' : ' + ware.name );
    }
  });

  done();
}

/**
 * Buy an item from this encounter
 *
 * @param Game
 * @param done
 */
function actionBuyItem( Game, done ){
  var target = Game.input.target;

  if ( this.wares[ target ] ){
    var item = this.wares[ target ];
    Game.character.items.push( item );

    // remove item from shop
    this.wares[ target ].sold = true;

    // when the user buys the bracelet, let the adventure remember
    if ( target == 'bracelet' ) {
      Game.adventure.hasBracelet = true;
    }

    Game.output("Ah! An excellent choice!");
  }
  else {
    Game.output("I don't believe I have that item.");
  }

  done();
}

/**
 * Buy an item from this encounter
 *
 * @param Game
 * @param done
 */
function actionBuyBuff( Game, done ){
  var target = Game.input.target;

  if ( this.wares[ target ] ){
    var item = this.wares[ target ];
    Game.character.addBuff( item );

    // remove item from shop
    this.wares[ target].sold = true;

    Game.output("Ah! An excellent choice!");
  }
  else {
    Game.output("I don't believe I have that item.");
  }

  done();
}


/**
 * Rebuke (ie. attack) the banshee!
 *
 * @param Game
 * @param done
 */
function actionRebukeBanshee( Game, done ){
  if ( Game.adventure.hasBracelet ){
    Game.encounter.challenge.rating -= 4;
  }

  if ( Game.adventure.hasCharm ){
    Game.encounter.challenge.rating -= 4;
  }

  // todo - attack vs spirit
  var charSpirit = Game.character.getAttrTotal('spirit');
  var charRoll = tools.random( 1, charSpirit );

  Game.output('You rolled a '+ charRoll + ' vs ' + Game.encounter.challenge.rating );

  if (charRoll >= Game.encounter.challenge.rating ){
    // you win
    var text = "Go Back to Hell where you belong! you scream as you demand divine satisfaction of the banshee."
      + "Her spectral form begins to shimmer as she screams once more in vain. Then she is gone.";

    Game.output( text );

    // successful combat gives 100 gp reward
    Game.doEffect({value: 100, type: 'gp'});
  }
  else {
    // you lose
    var text = "You voice croaks and cracks as the howling wind drowns your rebuke into nothing. "
      + "Agnie unhinges her jaw and releases another blasting moan that causes blood to flow from your ears. "
      + "You retreat into the hills, knowing that you can do nothing to save this town.";

    Game.output(text);

    // take 4 damage and a curse for your failure
    Game.character.hp -= 4;
    Game.character.addBuff({name: 'cursed', value: -2, attribute: 'spirit', duration: 10});
  }

  // the player can no longer travel freely throughout town
  // the adventure is over except for the epilogue.
  Game.adventure.canTravel = false;

  Game.nextEncounter();

  done();
}

/**
 * Answer the banshee and tell her who her murderer is
 *
 * @param Game
 * @param done
 */
function actionAnswerBanshee( Game, done ){
  var name = Game.input.target;

  if ( name == Game.adventure.riddleAnswer ){
    // you win
    var text = "You name Marie as Agnie's murderer. "
      + "Agnie's spectral form starts to shimmer and shake as she processes this truth. "
      + "\"Yeees\", she moans, \"I remember now. The Mist Demon ate my soul and cursed me "
      + "to this form. And it was Marie who struck the bargain. I shall deal with her before "
      + "I leave this world.  Thanks!\"";

    Game.output( text );

    // very long term blessing for solving the mystery
    Game.character.addBuff({name: 'bansheeblessing', value: 2, attribute: 'spirit', duration: 20});
    // heal up to 100 hp
    Game.doEffect( {value: 100, type: 'heal' } );
  }
  else {
    // you lose
    var text = "You voice croaks and cracks as the howling wind drowns your accusation into nothing. "
      + "Agnie unhinges her jaw and releases another blasting moan that causes blood to flow from your ears. "
      + "You retreat into the hills, knowing that you did not solve the mystery, "
      + "and can do nothing to save this town.";

    Game.output( text );

    // take 4 damage and a curse for your failure
    Game.character.hp -= 4;
    Game.character.addBuff({name: 'cursed', value: -2, attribute: 'spirit', duration: 10 });
  }

  // the player can no longer travel freely throughout town
  // the adventure is over except for the epilogue.
  Game.adventure.canTravel = false;

  Game.nextEncounter();
  done();
}


// ----------------------------------------------- Adventure ------

var wailOfTheBanshee = {

  title: 'Wail of the Banshee',
  desc: 'A stranger approaches you and asks for your assistance in a matter that threatens his whole town. '
  + 'After receiving much flattery, you answer his call for aid and travel with him to Bolton, '
  + 'a small village perched atop a steep cliff overlooking the sea.',


  // custom adventure data
  riddleAnswer: 'marie',

  // the user can travel between encounters that allow canVisit
  canTravel: true,

  // if the user has the bracelet & charm
  hasBracelet: false,
  hasCharm: false,

  // keep track of what user has learned
  adventureLog: [],

  // actions that can be performed during any encounter in this adventure
  actions: [
    { cmd: 'showmap', text: 'Look at your map' },
    { cmd: 'goto', text: 'Go to another location' },
    { cmd: 'showlog', text: 'Show adventure log' }
  ],

  // allow user to "travel" to different encounters
  goto: actionGoTo,

  // show all encounters in this adventure
  showmap: actionShowMap,

  // show adventure/encounter log
  showlog: actionShowLog,


  // ----------------------------- encounters
  encounters: [
    /**
     * Tavern's Place
     * run by Jerry Tavernkeeperson
     */
    {
      title: "Tavern's Place",
      desc: "In a dark and musky tavern, you meet Jerry Tavernkeeperson, owner of this fine establishment.",

      // user can goto this encounter directly
      canVisit: true,

      // the banshee is a spirit battle
      freeInfo: "The banshee attacks your very soul.  If you decide to fight her, be brave.",

      // info received from successful attack
      // redherring
      hiddenInfo: "Late at night, while rifling through a stack of papers in the back room of the tavern"
      + "you discover Jerry's diary. The most recent entry ends, '... Dad, what have you done?!?'",

      challenge: {
        rating: 4,
        attribute: 'body'
      },

      actions: [
        { cmd: 'beerme', text: 'A brewsky might help you think this whole thing through.' },
        { cmd: 'gatherinfo', text: 'Ask Jerry what he knows about this whole banshee business.' },
        { cmd: 'snooparound', text: 'Snoop around while no one is looking' }
      ],

      success: [
        { value: 17, type: 'xp' }
      ],

      fail: [
        { value: 10, type: 'xp' },
        { value: "You don't find anything helpful and decide to move on.", type: 'output' }
      ],

      // get drunk, good for fighting the final banshee
      beerme: function( Game, done ){
        if ( ! Game.character.hasBuff('tipsy') ) {
          Game.character.addBuff( { name: 'tipsy', value: -1, attribute: 'mind', duration: 10 } );
        }
        if ( ! Game.character.hasBuff('brave') ) {
          Game.character.addBuff( { name: 'brave', value: 1, attribute: 'spirit', duration: 10 } );
        }
        Game.output('Ahh.  Refreshing.');
        done();
      },

      // ask this dude a question
      gatherinfo: actionGatherInfo,

      // single attack chance to get extra info
      snooparound: actionAttackOnce
    },

    /**
     * Blister's Blessing Emporium
     * - owned by a Blister Halfman - the halfling
     */
    {
      title: "Blister's Blessing Emporium",
      desc: "\"Bless you my friend, how may I help you?\", says Blister Halfman, "
        + "the halfling owner of this decadent emporium of trinkets and fetishes.",

      // user can goto this encounter directly
      canVisit: true,

      // the
      freeInfo: "I remember the night she died those 20 years ago like it was yesterday. "
      + "But I can't just go around telling random strangers about such intimate details. ",

      // info received from successful attack
      // redherring
      hiddenInfo: "\"Well, I guess I am a pretty smart man.   I'll tell you this... "
      + "The night was black as coal, and the wind was pitching a mighty fit\"... "
      + "3 hours later, Blister finished his tale which highly implicates Tom Tavernkeeperson in the murder of his wife.",

      wares: {
        // a buff
        blessing: {
          name: "Blessing",
          value: 2,
          attribute: 'spirit',
          duration: 10
        },
        typhoon: {
          name: "Typhoon Strength",
          value: 3,
          attribute: 'body',
          duration: 10
        }
      },

      challenge: {
        rating: 4,
        attribute: 'spirit'
      },

      success: [
        { value: 17, type: 'xp' }
      ],

      fail: [
        { value: 10, type: 'xp' },
        { value: "Blister plays his cards close to his chest, and keeps his secrets even closer.  Without much to go on, you decide to move on.", type: 'output' }
      ],

      // custom actions
      actions: [
        { cmd: 'gatherinfo', text: 'Ask Blister what he knows about this whole banshee business.' },
        { cmd: 'showwares', text: 'Show me your wares!' },
        { cmd: 'buy', text: 'Buy an item from the showcase. Refer to it by its name.  eg, buy potion' },
        { cmd: 'flatterhim', text: "Blister seems like the kind of man that might respond to flattery." }
      ],

      // ask this dude a question
      gatherinfo: actionGatherInfo,

      // show items in the shop
      showwares: actionShowWares,

      // buy an item or service
      buy: actionBuyBuff,

      // attempt to flatter Blister into giving you more info
      flatterhim: actionAttackOnce
    },

    /**
     * Le' Item Shoppe
     * - owned by a Tom Tavernkeeperson
     */
    {
      title: "Le' Item Shoppe",
      desc: "\"Welcome!\", the portly man behind the counter proclaimed.  The shop is crowded with somewhat dusty supplies, "
        + "\"I'm Tom Tavernkeeperson, what can I do for you?\"",

      // user can goto this encounter directly
      canVisit: true,

      // the
      freeInfo: "Yes, the banshee. There are rumors that it is my own dead wife, back from the grave, "
        + "in seek of vengeance, justice, revenge, and closure.  I have not seen the ghost myself, but "
        + "I have seen the Mist Demon. The soul-eating monster that resides in the ocean spray. "
        + "The legends say it eats the soul of the innocent, and will barter for them in exchange for great power.",

      // info received from successful attack
      hiddenInfo: "Ok!  I'll tell you.  I dreamed of a beast of mist rising from the sea and devouring my wife. "
        + "And there laughing with the demon was Marie Clairvoyant. She burned like fire, and seemed to become young again.",

      wares: {
        // a potion item
        healpotion: {
          name: "Health Potion",
          desc: "Restores 10 HP",
          effects: [
            { value: 10, type: 'heal' }
          ]
        },
        // an adventure item
        bracelet: {
          name: "Old bracelet",
          desc: "An old and weathered thin golden charm bracelet, fashioned for a woman.",
          effects: [
            { value: "It seems really old, and probably not made by man.", type: 'output' }
          ]
        }
      },

      challenge: {
        rating: 4,
        attribute: 'mind'
      },

      success: [
        { value: 17, type: 'xp' }
      ],

      fail: [
        { value: 10, type: 'xp' },
        { value: "GET OUT!", type: 'output' }
      ],

      // custom actions
      actions: [
        { cmd: 'gatherinfo', text: 'Ask Tom what he knows about this whole banshee business.' },
        { cmd: 'showwares', text: 'Show me your wares!' },
        { cmd: 'buy', text: 'Buy an item from the showcase. Refer to it by its name.  eg, buy potion' },
        { cmd: 'presshim', text: 'Ask about his dead wife.'}
      ],

      // ask this dude a question
      gatherinfo: actionGatherInfo,

      // show items in the shop
      showwares: actionShowWares,

      // buy an item
      buy: actionBuyItem,

      // one-time attack
      presshim: actionAttackOnce
    },

    /**
     * Psychic Laundry Services
     * - run by Marie Clairvoyant
     * - she did it. sacrificed Agnei Tavernkeeperson to the Sea Demon
     */
    {
      title: "Psychic Laundry Services",
      desc: "Inside the flamboyant hut, you meet Maria Clairvoyant the proprietor. "
      + "'Welcome friend, I've been expecting your visit', she says. 'How may I help you?'",

      // user can goto this encounter directly
      canVisit: true,

      freeInfo: "Yes, I knew Agnei Tavernkepperson, we were once good friends. "
        + "It's really too bad what her husband did.",

      // info received from successful attack
      hiddenInfo: "Within Marie Clairvoyant's mind you see the events of Agnie's death, "
      + "and it sickens you to your core. You see an altar amidst a pillar of fire. Marie Clairvoyant "
      + "is sacrificing Agnie Tavernkeeperson to the Mist Demon, a sentient cloud of acid particles. "
      + "When you can take it no more, you break contact and stumble out of the laundromat.",

      challenge: {
        rating: 5,
        attribute: 'mind'
      },

      success: [
        { value: 17, type: 'xp' }
      ],

      fail: [
        { value: 10, type: 'xp' },
        { value: "Silly child, I do not take such things so lightly.", type: 'output' }
      ],

      // custom actions
      actions: [
        { cmd: 'contest', text: 'Challenge her to a mind-reading contest.  Your will vs hers, winner take all.' },
        { cmd: 'gatherinfo', text: 'Ask Marie what she knows about this whole banshee business.' }
      ],

      contest: actionAttackOnce,

      // ask this dude a question
      gatherinfo: actionGatherInfo
    },

    /**
     * The Cliff
     */
    {
      title: "The Cliff",
      desc: "You find yourself at the cliffs right outside of town, rocky ledge looms over a violent sea."
        + "The facts of the case whirl around in your mind as you take in the view and consider what to do next.",

      // user can goto this encounter directly
      canVisit: true,

      actions: [
        { cmd: 'lookaround', text: 'Look around for something interesting.' },
        { cmd: 'confront', text: 'Confront the banshee and end this once and for all.' }
      ],

      // you can find a charm if you already own the bracelet
      // both items make final encounter easier
      lookaround: function( Game, done ){
        if ( Game.adventure.hasBracelet && ! Game.adventure.hasCharm ){
          var text = "You find a small charm in the dirt that looks like it attaches to your bracelet."
            + "The charm bears the initials A.T.";

          Game.adventure.adventureLog.push(text);
          Game.adventure.hasCharm = true;
        }
        else {
          var text = "You look around for a bit, and then your mind starts to wander. "
            + "With the facts of the case whirling through your mind, you pace the ledge of the "
            + "cliff aimlessly.";
        }

        Game.output(text);

        done();
      },

      //
      confront: function( Game, done ){
        var tone = "You wait outside the old clock tower all night."
          + "Finally, as dawn begins to break, you hear movement from within. "
          + "Scaling the tattered spiral staircase within the clock tower, you quickly reach the top. ";

        Game.output("Your resolve is set. This will end today.");
        Game.output( tone );

        Game.adventure.canTravel = false;

        Game.nextEncounter();
        done();
      }
    },

    /**
     * Agnie Tavernkeeperson, the banshee
     */
    {
      title: "The Banshee of Bolton",
      desc: "Before you, a ghostly image of a rotting Agnie hovers a foot off the floor, "
        + "her back to you as she stares out at the sea. "
        + "She slowly turns her wet, dead head around towards you.  Her white, bloated eyes staring at nothing, her mouth agape."
        + "Her scream echoes throughout your brain, \"WHOOOOOO DID THIS TO MEEEEEE?\". Dare you answer?",

      // user can not goto this encounter directly
      canVisit: false,

      challenge: {
        rating: 10,
        attribute: 'spirit'
      },

      actions: [
        // normal combat with the banshee is very hard
        // this is a spirit attack that has a bonus when the player has the bracelet
        { cmd: 'rebuke', text: 'Rebuke the banshee and send her back from whence she came.' },
        { cmd: 'answer', text: 'Tell Agnie who killed her ( tom | jerry | marie | blister ).' }
      ],

      // the bracelet and charm make this encounter much easier
      rebuke: actionRebukeBanshee,

      // answer the riddle of the banshee
      answer: actionAnswerBanshee,

      // unlike an action, this method does not have a done callback
      afterLoad: function( Game ){
        //// remove the navigation methods the user can no longer perform
        //var remaining_actions = [];
        //
        //// loop through adventure actions and remove them as desired
        //_.forEach( Game.adventure.actions, function( action ){
        //  if ( action.cmd != 'showmap' && action.cmd != 'goto' ){
        //    remaining_actions.push( action );
        //  }
        //});
        //
        //Game.adventure.actions = remaining_actions;
      }
    },

    /**
     * Epilogue
     */
    {
      title: 'Banshee Epilogue',
      desc: "In light of all that has happened, you feel it is time to move on. "
        + "There is nothing more you can do for the town of Bolton, but you'll never "
        + "forget your time here. ----  The sea crashes endlessly against the cliffs "
        + "as you stare out over the water. Some day, you may have to come back and "
        + "face the Mist Demon you are sure resides in the spray.  But not today...",

      canVisit: false,

      actions:[
        { cmd: 'moveon', text: 'Move on to other adventures'}
      ],

      moveon: function( Game, done ){
        Game.doEffect( {value: 100, type: 'xp'} );
        Game.nextEncounter();
        done();
      }
    }
  ]

};


module.exports = wailOfTheBanshee;