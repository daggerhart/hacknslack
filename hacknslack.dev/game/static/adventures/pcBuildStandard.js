
module.exports = {

  is_static: true,
  name: 'pcBuildStandard',

  // current_encounter = 0, // even necessary for a template?  always zero?
  encounters: [
    {
      title: "Select your class",
      desc: "What you want pc build like?",

      // this encounter’s contextual actions
      actions: [
        {
          cmd: "savage",
          text: "A savage"
        }
      ],

      // action "savage"
      savage: function ( Game, done ){

        var new_character = {
          class: 'savage',
          attributes: {
            body: 10,
            mind: 6,
            spirit: 7,
            hp: 8
          }
        };

        Game.character = Game.components.Character.create( new_character );
        Game.adventure = require('./adventureOne');
        Game.encounter = Game.adventure.encounters[0];

        done();
      }
    }
  ]
}