
// init
var GameActions = {

  // create the action text and comment here for all global actions
  actions: {
    status: {
      cmd: "status",
      text: "Check your status",
      silent: true
    },
    help: {
      cmd: "help",
      text: "Get some game help",
      silent: true
    },
    attack: {
      cmd: "attack",
      text: "Attack that bitch!"
    },
    item: {
      cmd: "item",
      text: "Use and item by index"
    },
    equip: {
      cmd: "equip",
      text: "Equip an item in your inventory"
    },
    sit: {
      cmd: "sit",
      text: "Why don't you take a break"
    },
    spell: {
      cmd: "spell",
      text: "Cast a spell by index"
    },
    poop: {
      cmd: "poop",
      text: "Take a big dump"
    }
  },

  /**
   * Status
   *
   * @param Game
   * @param done
   */
  status: function( Game, done ){
    var p = Game.player;
    var c = Game.character;
    //var e = Game.encounter;

    Game.output.data.push( 'You: ' + p.user_name );
    Game.output.data.push( 'Class: ' + c.class );
    Game.output.data.push( 'HP: ' + c.attributes.hp );
    Game.output.data.push( 'Body: ' + c.attributes.body );
    Game.output.data.push( 'Mind: ' + c.attributes.mind );
    Game.output.data.push( 'Spirit: ' + c.attributes.spirit );

    Game.output.data.push('Inventory');

    // equipment
    Object.keys(c.equipment).forEach(function( key ){
      if ( c.equipment[ key].length ) {
        Game.output.data.push( key + ': ' + c.equipment[ key ] );
      }
    });

    // items
    if ( c.items ) {
      for (var i = 0; i < c.items.length; i++) {
        Game.output.data.push('- ' + c.items.title );
      }
    }

    Game.output.data.push();

    done();
  },

  /**
   * Provide help info for the player
   *
   * @param Game
   * @param done
   */
  help: function( Game, done ){

    Game.output.data.push('here is some helpful info');

    done();
  },

  /**
   * Attack
   *
   * @param Game
   * @param done
   */
  attack: function( Game, done ){
    Game.output.data.push("that's an attack!");

    var challenge = Game.encounter.challenge;
    var stat = Game.character.attributes[ challenge.attribute ];
    var roll = Game.utils.Math.random(1, stat);

    Game.output.data.push("rolled a " + roll);

    // do it
    if ( roll >= challenge.rating ){
      // you win
      Game.output.data.push("you win ");

      for ( var i = 0; i < Game.encounter.success.length; i++ ){
        var effect = Game.encounter.success[ i ];
        // do effect
        if ( effect.type == 'heal' ){

        }
      }
    }
    else {
      // loser
      Game.output.data.push("you lose ");

      for ( var i = 0; i < Game.encounter.fail.length; i++ ){
        var effect = Game.encounter.fail[ i ];
        // do effect
        if ( effect.type == 'dmg' ){
          Game.character.attributes.hp -= effect.amount;
        }
      }
    }

    // go to next encounter
    Game.components.Adventure.nextEncounter( Game );

    done();
  },

  item: function( Game, done ){
    Game.output.data.push("use that item bro");

    done();
  },

  equip: function( Game, done ){
    Game.output.data.push("equip that item bro");

    done();
  },

  sit: function( Game, done ){
    Game.output.data.push("sit down fool");

    done();
  },

  spell: function( Game, done ){
    Game.output.data.push("we could totally do something cool here");

    done();
  }
}

// adding new action

GameActions.poop = function( Game, done ){
  Game.output.data.push("huuunnnn  -- emit defensive - ah - fluids.");

  done();
}




module.exports = GameActions;