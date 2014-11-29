
module.exports = {

  is_static: true,
  name: 'pcBuildStandard',

  encounters: [
    // class selection
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
          level: 1,
          attributes: {
            body: 10,
            mind: 6,
            spirit: 7,
            hp: 8
          }
        };

        // create a new character and save it to the game as the player's current character
        Game.character = Game.components.Character.create( new_character );

        // set game to next encounter
        Game.components.Adventure.nextEncounter( Game );

        done();
      },

      merchant: function( Game, done ){

        var new_character = {
          class: 'merchant',
          level: 1,
          attributes: {
            body: 6,
            mind: 8,
            spirit: 10,
            hp: 7
          }
        };

        // create a new character and save it to the game as the player's current character
        Game.character = Game.components.Character.create( new_character );

        // set game to next encounter
        Game.components.Adventure.nextEncounter( Game );

        done();
      }
    },
    // name your pc
    {
      title: "Name your Character",
      desc: "Type name, then you characters name.  Eg:  /hack name bob",

      actions: [
        {
          cmd: "name",
          text: "Name yosef"
        }
      ],

      name: function( Game, done ){
        // get rid of first word, which is the action
        Game.input.words.shift();

        Game.character.name = Game.input.words.join(' ');

        // next encounter
        Game.components.Adventure.nextEncounter( Game );

        console.log('new character named - ' + Game.character.name );

        done();
      }
    },

    // start your journey
    {
      title: "Start your journey",
      desc: "Before you is a split path.  One leading into the dark forest, the other towards a tall mountain in the distance.",

      actions: [
        {
          cmd: "forest",
          text: "The forest is where I am at home."
        },
        {
          cmd: "mountain",
          text: "There maybe great treasure in those mountains."
        }
      ],

      forest: function( Game, done ){

        Game.adventure = require('./adventureOne');

        Game.character.current_encounter = 0;
        Game.encounter = Game.adventure.encounters[0];
        done();
      },

      mountain: function( Game, done ){

        Game.adventure = require('./adventureOne');

        Game.character.current_encounter = 0;
        Game.encounter = Game.adventure.encounters[0];
        done();
      }
    }
  ]
}