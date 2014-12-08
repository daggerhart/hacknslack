// encounter stubs
// should include title, desc, challenge attribute
module.exports = [
/*
  {
    title: '',
    desc: '',
    tags: [''],
    challenge: {
      attribute: ''
    }
  }
*/
  {
    title: "Riddling Wizards",
    desc: "Leaning against a wall are three chatting wizards.  You can tell they are wizards because of their tall pointy hats. They call you over and ask you to solve their riddle.  If you do, they will help you out.",
    tags: ["arcane"],
    challenge: {
      attribute: "mind"
    },
    attack_alias: ['solveriddle', "Shout out the answer with great vociferousness!"],
    success: [
      { type: 'output', amount: 'Correct, the answer was "Biscuits!."  Way to go!'},
      { type: 'output', amount: '"We will now make you flamey" the wizards sat in unison.  They wave their hands, and through some hocus pocus, your weapon glows with orange light.'}
      { type: 'buff', name: 'flamey', amount: {
        amount: 2, attribute: 'body', duration: 10
        }
      },
      { type: 'output', amount: '"Your weapon is now flamey.  It will hurt bad guys more.  But only for a little while."'}
    ]
  } 
]
