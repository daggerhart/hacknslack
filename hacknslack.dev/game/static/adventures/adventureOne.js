

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
        { amount: 5, type: 'dmg' }
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
  ]
}