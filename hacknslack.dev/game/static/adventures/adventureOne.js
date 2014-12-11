

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
      success: [
        { value: 'You strike the wolf solidly across the nose and he runs away!', type: 'output' },      
      ],
      fail: [
        { value: 2, type: 'dmg' }, // an effect
        { value: 'The beast bites your foot hard!', type: 'output' },
        { value: 17, type: 'xp' }
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
      attack_alias:  ['answer', 'you are the riddle champion after all...'],
      success: [
        { value: 15, type: 'heal' },
        { value: 'You correctly respond to the riddle with "A Purple Nurple."  The answer was inside you all along!', type: 'output' },
        { value: 17, type: 'xp' }
      ],
      fail: [
        { type: "output", value: "You incorrectly respond to the riddle with 'in my pocket'. The confused goblin renders you no aid."}
      ]
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
      success: [
        {type: "output", value: "YOU KNEW WHO TO CALL"}
      ],

      fail: [
        { value: 2, type: 'dmg' },
        { type: "output", value: "The ghost bops you on the head and flies away!" },
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
      success: [
        {type: "output", value: "YOU WIN! 100xp!"},
        {type: "xp", value: 100}
      ],

      fail: [
        { value: 2, type: 'dmg' },
      ]
    },    
    
    // fuck this encounter
    // -mike
    {
      title: "Split path",
      desc: "Two paths diverged in a yellow wood. One to the left, and the other - a locked door to the right.",

      challenge: {
        rating: 6,
        attribute: 'mind'
      },

      attack_alias: ['right', 'The answers are right behind this door!'],
      actions: [
        // using an action object to create a new custom action for this encounter
        {
          cmd: 'left',
          text: 'take the path to the left'
        }
      ],

      success: [
        { type: 'gp', value: 100 }
      ],

      fail: [
        // POISON TRAP!
        { type: 'buff', value: { name: 'poison', value: -2, attribute:  'body', duration: 2 } },
        { type: 'output', value: 'You failed to open the door, but you did not fail to set off the Poison Trap!' }
      ],

      left: function( Game, done ){
        Game.output('You have respect for the law, congrats!  Try feeding your family with that.');

        Game.nextEncounter();
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
      },
      success: [
        {type: "output", value: "The death knight shamefully lowers his head and wanders off, rethinking his unlife choices."}
      ],

      fail: [
      	{type: "output", value: "The death knight shouts back at you, criticizing you in ever way but especially your haircut!"},
        { value: 2, type: 'dmg' }
      ]      
    }
  ]
}