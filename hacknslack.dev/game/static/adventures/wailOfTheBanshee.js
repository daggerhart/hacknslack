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

/**
 * Get free info from this encounter
 *
 * @param Game
 * @param done
 */
function actionGatherInfo( Game, done ){
  // only gather info once
  Game.output( this.freeInfo );
  Game.adventure.encounterLog.push( this.freeInfo );

  done();
}

/**
 * An attack that a player may only attempt once
 *
 * @param Game
 * @param done
 */
function actionAttackOnce( Game, done ){
  if ( Game.encounter.hasAttacked ) {
    Game.output("you can't do that again.");
    done();
  }
  else {
    // do an attack action
    var action = _.clone(globalActions.actions.attack);
    action.context = 'global';

    // remember that we've done this encounter's attack
    Game.adventure.encounters[ Game.character.current_encounter ].hasAttacked = true ;

    Game.doAction(action, function () {
      done();
    });
  }
}
/**
 * Goto a specific encounter
 *
 * @param Game
 * @param done
 */
function actionGoTo( Game, done ){
  var encounterIndex = Game.input.target;

  if ( Game.adventure.encounters[ encounterIndex ] ){
    var encounter = Game.adventure.encounters[ encounterIndex ];

    if ( encounter.canGoTo ) {
      Game.encounter = new Encounter( encounter );
      Game.character.current_encounter = encounterIndex;

      Game.output("You go to the " + Game.encounter.title );
    }
  }

  done();
}

/**
 *
 * @param Game
 * @param done
 */
function actionShowMap( Game, done ) {
  _.forEach(this.encounters ,function( value, key ){
    if ( value.canGoTo ) {
      Game.output(  '-' + key + ' : ' + value.title );
    }
  });

  done();
}

/**
 * Show the 'wares' within the current encounter
 *
 * @param Game
 * @param done
 */
function actionShowcase( Game, done ){

  _.forIn( this.wares, function( value, key ){
    if ( ! value.sold ) {
      Game.output( '-' + key + ' : ' + value.name );
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

// ----------------------------------------------- Adventure ------

var wailOfTheBanshee = {

  title: 'Wail of the Banshee',
  desc: 'A stranger approaches you and asks for your assistance in a matter that threatens his whole town. '
  + 'After receiving much flattery, you answer his call for aid and travel with him to Bolton, '
  + 'a small village perched atop a steep cliff overlooking the sea.',


  // custom adventure data
  riddleAnswer: 'marie',

  // if the user has the bracelet
  //hasBracelet: false,

  // keep track of what user has learned
  encounterLog: [],

  // actions that can be performed during any encounter in this adventure
  actions: [
    {
      cmd: 'showmap',
      text: 'Look at your map'
    },
    {
      cmd: 'goto',
      text: 'Go to another location'
    }
  ],

  // allow user to "travel" to different encounters
  goto: actionGoTo,

  // show all encounters in this adventure
  showmap: actionShowMap,


  // ----------------------------- encounters
  encounters: [
    /**
     * Tavern's Place
     * run by Jerry Tavernkeeperson
     */
    {
      // the banshee is a spirit battle
      freeInfo: "The banshee attacks your very soul.  If you decide to fight her, be brave.",

      // info received from successful attack
      // redherring
      hiddenInfo: "Late at night, while rifling through a stack of papers in the back room of the tavern"
      + "you discover Jerry's diary. The most recent entry ends, '... Dad, what have you done?!?'",

      // user has attacked
      //hasAttacked: false,

      // user can goto this encounter directly
      canGoTo: true,

      title: "Tavern's Place",
      desc: "In a dark and musky tavern, you meet Jerry Tavernkeeperson, owner of this fine establishment.",

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
        { amount: 17, type: 'xp' },
        { amount: this.hiddenInfo, type: 'output' }
      ],
      fail: [
        { amount: 10, type: 'xp' },
        { amount: "You don't find anything helpful and decide to move on.", type: 'output' }
      ],

      // get drunk, good for fighting the final banshee
      beerme: function( Game, done ){
        if ( ! Game.character.hasBuff('tipsy') ) {
          Game.character.addBuff( { name: 'tipsy', amount: -1, attribute: 'mind', duration: 10 } );
        }
        if ( ! Game.character.hasBuff('brave') ) {
          Game.character.addBuff( { name: 'brave', amount: 1, attribute: 'spirit', duration: 10 } );
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

      // the
      freeInfo: "I remember the night she died those 20 years ago like it was yesterday. "
      + "But I can't just go around telling random strangers about such intimate details. ",

      // user has attacked
      //hasAttacked: false,

      // user can goto this encounter directly
      canGoTo: true,

      // info received from successful attack
      // redherring
      hiddenInfo: "\"Well, I guess I am a pretty smart man.   I'll tell you this... "
      + "The night was black as coal, and the wind was pitching a mighty fit\"... "
      + "3 hours later, Blister finished his tale which highly implicates Tom Tavernkeeperson in the murder of his wife.",

      wares: {
        // a buff
        blessing: {
          name: "Blessing",
          amount: 2,
          attribute: 'spirit',
          duration: 10
        },
        typhoon: {
          name: "Typhoon Strength",
          amount: 3,
          attribute: 'body',
          duration: 10
        }
      },

      challenge: {
        rating: 4,
        attribute: 'spirit'
      },
      success: [
        { amount: 17, type: 'xp' },
        { amount: this.hiddenInfo, type: 'output' }
      ],
      fail: [
        { amount: 10, type: 'xp' },
        { amount: "Blister plays his cards close to his chest, and keeps his secrets even closer.  Without much to go on, you decide to move on.", type: 'output' }
      ],

      // custom actions
      actions: [
        { cmd: 'gatherinfo', text: 'Ask Blister what he knows about this whole banshee business.' },
        { cmd: 'showcase', text: 'Show me your wares!' },
        { cmd: 'buy', text: 'Buy an item from the showcase. Refer to it by its name.  eg, buy potion' },
        { cmd: 'flatterhim', text: "Blister seems like the kind of man that might respond to flattery." }
      ],

      // ask this dude a question
      gatherinfo: actionGatherInfo,

      // show items in the shop
      showcase: actionShowcase,

      // buy an item or service
      buy: actionBuyBuff,

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

      // the
      freeInfo: "Yes, the banshee. There are rumors that it is my own dead wife, back from the grave, "
        + "in seek of vengeance, justice, revenge, and closure.  I have not seen the ghost myself, but "
        + "I have seen the Mist Demon. The soul-eating monster that resides in the ocean spray. "
        + "The legends say it eats the soul of the innocent, and will barter for them in exchange for great power.",

      // info received from successful attack
      hiddenInfo: "Ok!  I'll tell you.  I dreamed of a beast of mist rising from the sea and devouring my wife. "
        + "And there laughing with the demon was Marie Clairvoyant. She burned like fire, and seemed to become young again.",

      // user has attacked
      //hasAttacked: false,

      // user can goto this encounter directly
      canGoTo: true,

      wares: {
        // a potion item
        healpotion: {
          name: "Health Potion",
          desc: "Restores 10 HP",
          effects: [
            { amount: 10, type: 'heal' }
          ]
        },
        // an adventure item
        bracelet: {
          name: "Old bracelet",
          desc: "An old and weathered thin golden charm bracelet, fashioned for a woman.",
          effects: [
            { amount: "It seems really old, and probably not made by man.", type: 'output' }
          ]
        }
      },

      challenge: {
        rating: 4,
        attribute: 'mind'
      },
      success: [
        { amount: 17, type: 'xp' },
        { amount: this.hiddenInfo, type: 'output' }
      ],
      fail: [
        { amount: 10, type: 'xp' },
        { amount: "GET OUT!", type: 'output' }
      ],

      // custom actions
      actions: [
        { cmd: 'gatherinfo', text: 'Ask Tom what he knows about this whole banshee business.' },
        { cmd: 'showcase', text: 'Show me your wares!' },
        { cmd: 'buy', text: 'Buy an item from the showcase. Refer to it by its name.  eg, buy potion' },
        { cmd: 'presshim', text: 'Ask about his dead wife.'}
      ],

      // ask this dude a question
      gatherinfo: actionGatherInfo,

      // show items in the shop
      showcase: actionShowcase,

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

      freeInfo: "Yes, I knew Agnei Tavernkepperson, we were once good friends. "
        + "It's really too bad what her husband did.",

      // info received from successful attack
      hiddenInfo: "Within Marie Clairvoyant's mind you see the events of Agnie's death, "
      + "and it sickens you to your core. You see an altar amidst a pillar of fire. Marie Clairvoyant "
      + "is sacrificing Agnie Tavernkeeperson to the Mist Demon, a sentient cloud of acid particles. "
      + "When you can take it no more, you break contact and stumble out of the laundromat.",

      // user has attacked
      //hasAttacked: false,

      // user can goto this encounter directly
      canGoTo: true,

      challenge: {
        rating: 5,
        attribute: 'mind'
      },
      success: [
        { amount: 17, type: 'xp' },
        { amount: this.hiddenInfo, type: 'output' }
      ],
      fail: [
        { amount: 10, type: 'xp' },
        { amount: "Silly child, I do not take such things so lightly.", type: 'output' }
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
      desc: "You find yourself and the cliffs right outside of time, rocky ledge looms over a violent sea."
        + "The facts of the case whirl around in your mind as you take in the view and consider what to do next.",

      // user can goto this encounter directly
      canGoTo: true,

      actions: [
        {
          cmd: 'lookaround',
          text: 'Look around for something interesting.'
        },
        {
          cmd: 'confront',
          text: 'Confront the banshee and end this once and for all.'
        }
      ],

      //
      lookaround: function( Game, done ){
        // todo
      },

      //
      confront: function( Game, done ){
        var tone = "You wait outside the old clock tower all night."
        + "Finally, as dawn begins to break, you hear movement from within. "
        + "Scaling the tattered spiral staircase within the clock tower, you quickly reach the top. ";

        Game.output("Your resolve is set. This will end today.");
        Game.output( tone );
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
      canGoTo: false,

      challenge: {
        rating: 10,
        attribute: 'spirit'
      },

      actions: [
        // normal combat with the banshee is very hard
        // this is a spirit attack that has a bonus when the player has the bracelet
        {
          cmd: 'rebuke',
          text: 'Rebuke the banshee and send her back from whence she came.'
        },
        {
          cmd: 'answer',
          text: 'Tell Agnie who killed her ( tom | jerry | marie | blister ).'
        }
      ],

      //
      rebuke: function( Game, done ){
        if ( Game.adventure.hasBracelet ){
          this.challenge.rating -= 8;
        }

        // todo

        done();
      },

      // answer the riddle of the banshee
      answer: function( Game, done ){
        var name = Game.input.target;

        // todo
        if ( name == this.riddleAnswer ){
          // you win
        }
        else {
          // you lose
        }

        done();
      }
    }
  ]

};


module.exports = wailOfTheBanshee;