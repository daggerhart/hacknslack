module.exports = {
	name: 'assassin',
	description: 'A perfectly legitimate businessmen conducting legal affairs why are you judging them.',
	attributes: {
	  hp: "strong",
	  spirit: "weak",
	},
	actions: [
		{
			cmd: "clean",
			text: "IT'S A EUPHAMISM",
		}
	],
	hawk: function( Game, done ) {
		// TODO: usefulness
		Game.output("WHY IS THERE SO MUCH BLOOD.");
		done();
	},
  // TODO: ITEMS!
}
