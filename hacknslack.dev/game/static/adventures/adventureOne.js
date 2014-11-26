

module.exports = {

  is_static: true,
  name: 'adventureOne',

  // current_encounter = 0, // even necessary for a template?  always zero?

  encounters: [
    {
      title: "Deranged Wolf",
      desc: "The deranged wolf that has been following you must have decided you look tasty!",

      challenge: {
        rating: 10,
        attribute: 'body'
      },

      // this encounter’s contextual actions
      actions: [ 'attack' ],

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
      actions: [ 'attack' ],

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
        done();
      }
    },

    {
      title: 'Death Knight',
      desc: 'A knight that was dead, and now is dead.',
      tags: ['boss'],

      actions: [
        {
          cmd: "turn",
          text: "Shout at that bitch!"
        },
        {
          cmd: "push",
          text: "Well, maybe you shouldn't stand next to a pit of lava, you dumb bastard!"
        }
      ],

      turn: function( Game, done ){
        Game.encounter.challenge = {
          rating: 7,
          attribute: 'spirit'
        }
        Game.output.data.push("You try to turn it.");
        Game.GameActions.attack( Game, function(){
          done();
        });
      },

      push: function( Game, done){
        Game.encounter.challenge = {
          rating: 6,
          attribute: 'body'
        }
        Game.output.data.push("you tried to push it");
        Game.GameActions.attack( Game, function(){
          done();
        });
      }
    }
  ]
}