var tools = require('tools');

module.exports = {

  title: "Death",

  encounters: [
    {
      title: "You're dead!",
      desc: "Sorry, but you didn't make it.  You tried real hard, but in the end, that wasn't enough. Deal with it.",

      // this encounter’s contextual actions
      actions: [
        {
          cmd: "newcharacter",
          text: "Create a new character"
        }
      ],

      // action "standard"
      newcharacter: function( Game, done ){
        Game.startAdventure('pcBuildProcess.js');
        done();
      }
    }
  ]
}