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

    if ( ! Game.character.hasBuff('raging') ) {
      Game.output("RAAWAWRAWRRRR!!!!!");
      var buff = {
        name: 'raging',
        value: 3,
        attribute: 'body',
        duration: 2
      };

      Game.character.addBuff(buff);
    }
    else {
      Game.output("Already raging");
    }

		done();
	}
  // TODO: ITEMS!
}
