var Buff = require('buff');

module.exports = {
	name: 'savage',
	description: 'Rick flair is a semi-retired professional wrestler currently signed with no one.',
 
	attributes: {
	  body: "strong",
	  mind: "weak"
	},
	actions: [
		{
			cmd: "rage",
			text: "FLIP THE FUCK OUT"
		}
	],

	rage: function( Game, done ) {
		// TODO: usefulness
		Game.output("RAAWAWRAWRRRR!!!!!");

    if ( !Game.character.is_raging ) {
      var buff = {
        amount: 3,
        attribute: 'body',
        duration: 2
      };

      Game.character.addBuff(buff);
      Game.character.is_raging = true;
    }

		done();
	}
  // TODO: ITEMS!
}
