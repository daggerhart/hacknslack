

module.exports = {

  title: 'adventureOne',

  encounters: [
    {
      title: "Deranged Wolf",
      desc: "The deranged wolf that has been following you must have decided you look tasty!",

      challenge: {
        rating: 10,
        attribute: 'body'
      },

      // using an array to alias the global attack action
      attack_alias: ['swat',  'Swat him with a rolled up newspaper!' ],
      success: [],
      fail: [
        { amount: 2, type: 'dmg' }, // an effect
        { amount: 'The wolf bested you and bites your foot for 5 HP!', type: 'output' },
        { amount: 17, type: 'xp' }
      ]
    },
    {
      title: "Goblin Wizard",
      desc: "A wizened goblin offers you healing if you can solve his riddle.",
      challenge: {
        rating: 1,
        attribute: 'mind'
      },
      // using an array to alias the global attack action
      attack_alias:  ['answer', 'You correctly respond to the riddle with "A Purple Nurple."  The answer was inside you all along!'],
      success: [
        { amount: 1, type: 'heal' },
        { amount: 'You got healed 10 HP!', type: 'output' },
        { amount: 17, type: 'xp' }
      ],
      fail: []
    },
    {
      title: "Unsettling Spirit",
      desc: "ah-oooooooooohh... eck eck  wah-ooooooooooh!",

      challenge: {
        rating: 5,
        attribute: 'spirit'
      },

      // this encounter’s contextual actions
      actions: [
        // using an action object to alias the global attack action
        {
          cmd: 'attack',
          alias: 'exorcise',
          text: 'Ba-dabap-bopbop'
        }
      ],
      success: [],

      fail: [
        { amount: 2, type: 'dmg' }
      ]
    },
    {
      title: "A standard encounter",
      desc: "BORING",

      challenge: {
        rating: 7,
        attribute: 'body'
      },

      // this encounter’s contextual actions
      actions: [
        // provide default attack action
        'attack'
      ],
      success: [],

      fail: [
        { amount: 2, type: 'dmg' }
      ]
    },    
    
    // fuck this encounter
    // -mike
    /*{
      title: "Split path",
      desc: "A path to your left, or a locked door to the right.",

      challenge: {
        rating: 6,
        attribute: 'mind'
      },

      // this encounter’s contextual actions
      actions: [
        // provide default attack action
        'attack',
        // using an action object to create a new custom action for this encounter
        {
          cmd: 'path',
          text: 'take the path to the left'
        }
      ],

      success: [
        // give character an item
      ],

      fail: [],

      path: function( Game, done ){
        Game.output('You have respect for the law, congrats!  Try feeding your family with that.');

        Game.nextEncounter();
        done();
      }
    },*/

    {
      title: 'Death Knight',
      desc: 'A knight that was dead, and now is dead.',
      tags: ['boss'],
      challenge: {
        attribute: 'body'
      },
      actions: [
        // using action object to alias global attack action
        {
          cmd: "attack",
          alias: "turn",
          text: "Shout at that bitch!"
        },
        // custom action for this encounter
        {
          cmd: "push",
          text: "Well, maybe you shouldn't stand next to a pit of lava, you dumb bastard!"
        }
      ],

      push: function( Game, done){
        Game.output("you tried to push it but nothing happened");
        done();
      }
    }
  ]
}