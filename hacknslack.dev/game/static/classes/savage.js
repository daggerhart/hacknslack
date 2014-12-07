module.exports = {
	name: 'savage',
	description: 'Rick flair is a semi-retired professional wrestler currently signed with no one.',
 
	attributes: {
	  body: "strong",
	  mind: "weak",
	},
	actions: [
		{
			cmd: "rage",
			text: "FLIP THE FUCK OUT",
		}
	],
	rage: function( Game, done ) {
		// TODO: usefulness
		Game.output("CALM DOWN BRAH");
		done();
	},
  // TODO: ITEMS!
}
