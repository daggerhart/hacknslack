
// init
var GameActions = {

  /**
   * Status
   *
   * @param Game
   * @param done
   */
  status: function( Game, done ){

    Game.output.data.push("show me the status ho");

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
    var roll = Game.util.Math.random(1, stat);

    Game.output.data.push("rolled a " + roll);

    // do it
    if ( roll >= challenge.rating ){
      // you win
      Game.output.data.push("you win ");

      for ( var i = 0; i < Game.encounter.success.length; i++ ){
        var effect = Game.encounter.success[ i ];
        // do effect
        if ( effect.type == 'dmg' ){

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
    done();
  }
}

// adding new action
GameActions.item = function( Game, done ){
  Game.output.data.push("use that item bro");

  done();
}


GameActions.sit = function( Game, done ){
  Game.output.data.push("sit down fool");

  done();
}

GameActions.spell = function( Game, done ){
  Game.output.data.push("we could totally do something cool here");

  done();
}

module.exports = GameActions;