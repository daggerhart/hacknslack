
module.exports = {

  is_static: true,
  name: 'pcBuildProcess',

  // current_encounter = 0, // even necessary for a template?  always zero?

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
        Game.adventure = require('./pcBuildStandard');
        Game.encounter = Game.adventure.encounters[0];
        done();
      }
    }
  ]
}