module.exports = {
	name: 'merchant',
	description: 'An ambitious and often avaracious adventurer auctioning oddities.',
	attributes: {
	  spirit: "strong",
	  body: "weak"
	},
	actions: [
		{
			cmd: "hawk",
			text: "GIVE THEM THE HARD SALE"
		}
	],

	hawk: function( Game, done ) {
		// TODO: usefulness
		Game.output("STOP CALLING ME BRAH");
		done();
	}
  // TODO: ITEMS!
};
