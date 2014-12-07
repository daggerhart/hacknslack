module.exports = {
	name: 'assassin',
	description: 'A perfectly legitimate businessmen conducting legal affairs why are you judging them.',
	attributes: {
	  hp: "strong",
	  spirit: "weak"
	},

  actions: [
		{
			cmd: "stalk",
			text: "Prepare yourself for the fight!"
		}
	],

  // bypass the current encounter completely at the cost of 2 hp
	stalk: function( Game, done ) {

    if ( ! Game.character.hasBuff('stalking') ) {
      Game.output("You've found the weaknesses, but at a cost");
      Game.character.addBuff({name: 'stalking', amount: -2, attribute: 'spirit', duration: 3});
      Game.character.addBuff({name: 'stalking', amount: 2, attribute: 'body', duration: 1});
      Game.character.addBuff({name: 'stalking', amount: 2, attribute: 'mind', duration: 1});
    }
    else {
      Game.output("You're too tired to stalk again now");
    }

		done();
	}
  // TODO: ITEMS!
};
