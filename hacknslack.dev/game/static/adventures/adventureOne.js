

module.exports = {

  is_static: true,
  name: 'adventureOne',

  encounters: [
    {
      title: "Deranged Wolf",
      desc: "The deranged wolf that has been following you must have decided you look tasty!",

      challenge: {
        rating: 10,
        attribute: 'body'
      },

      // this encounter’s contextual actions
      actions: [ 'swat' ],
      texts: [ 'Swat him with a rolled up newspaper!' ],
      success: [],

      fail: [
        { amount: 5, type: 'dmg' } // an effect
      ]
    },
    {
      title: "Goblin Wizard",
      desc: "A wizened goblin offers you healing if you can solve his riddle.",

      challenge: {
        rating: 10,
        attribute: 'mind'
      },

      // this encounter’s contextual actions
      actions: [ 'answer' ],
      texts: [ 'The answer was inside you all along!' ],
      success: [
        { amount: 10, type: 'heal' }
      ],

      fail: []
    },
    {
      title: "Unsettling Spirit",
      desc: "ah-oooooooooohh... eck eck  wah-ooooooooooh!",

      challenge: {
        rating: 10,
        attribute: 'spirit'
      },

      // this encounter’s contextual actions
      actions: [ 'exorcise' ],
      texts: [ 'Ba-dabap-bopbop' ],
      success: [],

      fail: [
        { amount: 5, type: 'dmg' }
      ]
    },
    {
      title: "A standard encounter",
      desc: "BORING",

      challenge: {
        rating: 10,
        attribute: 'body'
      },

      // this encounter’s contextual actions
      actions: [ 'attack' ],
      success: [],

      fail: [
        { amount: 5, type: 'dmg' }
      ]
    },    
    
    
    {
      title: "Split path",
      desc: "A path to your left, or a locked door to the right.",

      challenge: {
        rating: 6,
        attribute: 'mind'
      },

      // this encounter’s contextual actions
      actions: [
        'attack',
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
        Game.output.data.push('You have respect for the law, congrats!  Try feeding your family with that.');
        Game.components.Adventure.nextEncounter( Game );
        done();
      }
    },

    {
      title: 'Death Knight',
      desc: 'A knight that was dead, and now is dead.',
      tags: ['boss'],
      challenge: {
        attribute: 'body'
      },
      actions: [
        {
          cmd: "attack",
          alias: "turn",
          text: "Shout at that bitch!"
        },
        {
          cmd: "push",
          text: "Well, maybe you shouldn't stand next to a pit of lava, you dumb bastard!"
        }
      ],

      push: function( Game, done){
        Game.output.data.push("you tried to push it but nothing happened");
        done();
      }
    }
  ]
}