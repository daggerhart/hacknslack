

module.exports = {

  is_static: true,
  name: 'adventureOne',

  // current_encounter = 0, // even necessary for a template?  always zero?

  encounters: [
    {
      title: "Sickly goblin",
      desc: "A sickly goblin burst from the brush and charges you with a knife!",

      challenge: {
        rating: 2,
        attribute: 'body'
      },

      // this encounter’s contextual actions
      actions: [ 'attack' ],

      success: [],

      fail: [
        { amount: 2, type: 'dmg' }
      ]
    }
  ]
}