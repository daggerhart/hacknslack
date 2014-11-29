
module.exports = {

  is_static: true,
  name: 'pcBuildStandard',

  encounters: [
    {
      title: "Select your class",
      desc: "What you want pc build like?",

      // this encounter’s contextual actions
      actions: [
        {
          cmd: "savage",
          text: "A savage"
        },
        {
          cmd: "merchant",
          text: "a gilded merchant"
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

        console.log('-----------should have new character-----------');
        //console.log(Game.character);

        done();
      },

      merchant: function( Game, done ){

        var new_character = {
          class: 'merchant',
          attributes: {
            body: 6,
            mind: 8,
            spirit: 10,
            hp: 7
          }
        };

        var character = Game.components.Character.create( new_character );

        Game.character = character;

        Game.adventure = require('./adventureOne');

        Game.encounter = Game.adventure.encounters[0];

        done();
      }
    }
  ]
}