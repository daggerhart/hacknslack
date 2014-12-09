var tools = require('tools');
var Adventure = require('adventure');
var Encounter = require('encounter');


module.exports = {

  title: 'PC standard build process',

  encounters: [
    // class selection
    {
      title: "Select your class",
      desc: "Choose from one of our several fancy smancy classes:",

      // this encounter’s contextual actions
      actions: [
      	{
      	  cmd: "choose",
      	  text: "choose a class by name"
      	},
      	{
      	  cmd: "list",
      	  text: "list available classes"
      	}
      ],
    
      choose: function ( Game, done) {
        // get rid of first word, which is the action
        Game.input.words.shift();

        var classname = Game.input.words.join(' ');
        var classobj = tools.files.getClass(classname + ".js");
        console.log("Attempting to choose class: " + classname);
        if (classobj) {
          var Character = require('character');
          console.log('choose the something class- ' + classobj.name );

          var new_character = {
            class: classobj,
            level: 1,
            attributes: {
              body: 6,
              mind: 6,
              spirit: 6,
              hp: 6
            }
          };
          
          // okay: if the classobj has mind defined, and it is strong, +4
          // if it's defined and not strong, it's weak, so do nothing
          // if it's not defined, it's average! hahahahaha screw you guys
          // -mike
          if (classobj.attributes.mind) {
            if (classobj.attributes.mind == "strong") {
              new_character.attributes.mind += 4;
            } 
          } else {
            new_character.attributes.mind += tools.random(1,2); 
          }
          // ditto body
          if (classobj.attributes.body) {
            if (classobj.attributes.body == "strong") {
              new_character.attributes.body += 4;
            } 
          } else {
            new_character.attributes.body += tools.random(1,2); 
          }
          // ditto spirit
          if (classobj.attributes.spirit) {
            if (classobj.attributes.spirit == "strong") {
              new_character.attributes.spirit += 4;
            } 
          } else {
            new_character.attributes.spirit += tools.random(1,2); 
          }
          // ditto hp
          if (classobj.attributes.hp) {
            if (classobj.attributes.hp == "strong") {
              new_character.attributes.hp += 4;
            } 
          } else {
            new_character.attributes.hp += tools.random(1,2); 
          }

          new_character.hp = new_character.attributes.hp;

          // create a new character and save it to the game as the player's current character
          Game.character = Character.create( new_character );

          Game.nextEncounter();    
        } else {
        	Game.output("There is no " + classname + " class, or they have no "
        	  + "class! Please /hack list to list available classes!");
        }

        done();     	      
      },
      
      list: function ( Game, done ) {
        console.log("***attempting to list all classes***");
        var classes = tools.files.getAllClasses();
        //var class_names = [];
        
        classes.forEach( function(class_obj) {
          Game.output("----------");
          Game.output(class_obj.name);
          Game.output(class_obj.description);
        });
               
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
        Game.nextEncounter();

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

        Game.startAdventure('adventureOne.js');
        done();
      },

      mountain: function( Game, done ){

        Game.startAdventure('wailOfTheBanshee.js');
        done();
      }
    }
  ]
}