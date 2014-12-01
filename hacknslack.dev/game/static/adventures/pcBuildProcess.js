var tools = require('tools');

module.exports = {

  title: 'PC build process selection',

  encounters: [
    {
      title: "How do you want to build your character?",
      desc: "What you want pc build like?",

      // this encounter’s contextual actions
      actions: [
        {
          cmd: "standard",
          text: "Class Selection"
        }
      ],

      // action "standard"
      standard: function( Game, done ){
        Game.loadAdventure('pcBuildStandard.js');
        done();
      }
    }
  ]
}