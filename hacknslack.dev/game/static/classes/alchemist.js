module.exports = {
	name: 'alchemist',
	description: 'An ambitious and often avaracious adventurer auctioning oddities.',
	attributes: {
	  mind: "strong",
	  hp: "weak"
	},
	actions: [
		{
			cmd: "brew",
			text: "pour yourself a brew"
		}
	],

	brew: function( Game, done ) {
		// TODO: usefulness
		Game.output("REFRESHING");

		done();
	}
  // TODO: ITEMS!
};
