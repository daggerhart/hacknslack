module.exports = {
	name: 'mightymouse',
	description: 'He\'s a really cool dude with heat rays for eyes.',
	attributes: {
	  mind: "strong",
	  hp: "strong",
	  body: "strong",
	  spirit: "strong",
	},
	actions: [
		{
			cmd: "pose",
			text: "pose heroically, healing yourself entirely."
		}
	],

	pose: function( Game, done ) {
		// TODO: usefulness
		Game.output("HERE I COME TO SAVE THE DAY!");
    Game.character.hp+=1;
		done();
	}
  // TODO: ITEMS!
};
