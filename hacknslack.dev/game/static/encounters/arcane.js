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
    title: 'Riddling Wizards',
    desc: 'Leaning against a wall are three chatting wizards.  You can tell they are wizards because of their tall pointy hats. They call you over and ask you to solve their riddle.  If you do, they will help you out.',
    tags: ['arcane'],
    challenge: {
      attribute: 'mind'
    },
    attack_alias: ['solveriddle', 'You shout out the answer with great vociferousness!'],
    success: [
      { type: 'output', amount: 'Correct, the answer was "Biscuits!."  Way to go!'},
      { type: 'output', amount: '"We will now make you flamey" the wizards say in unison.  They wave their hands, and through some hocus pocus, your weapon glows with orange light.'},
      { type: 'buff', name: 'flamey', amount: {
        amount: 2, attribute: 'body', duration: 10
        }
      },
      { type: 'output', amount: '"Your weapon is now flamey.  It will hurt bad guys more.  But only for a little while."'}
    ]
  },
  {
    title: 'Glowing Blue Stone',
    desc: 'You notice a soft blue light off to the side.  Jutting out of the ground is a oblong stone, two feet tall, and glowing a bright blue.  Mayhaps you should ascertain the source of its glow, mayhaps?',
    tags: ['arcane'],
    challenge: {
      attribute: 'mind',
    },
    attack_alias: ['ponderstone', 'You ponder what could make a stone glow blue.'],
    success: [
      { type: 'output', amount: 'Turns out to be a species of glowing blue moss.  You find the glow comforting.'},
      { type: 'buff', name: 'comforted', amount: {
        amount: 1, attribute: 'spirit', duration: 3
        }
      },
      { type: 'output', amount: 'For a little while, you feel comforted by the soft blue light.'}
    ],
    fail: [
      { type: 'output', amount: 'The mystery of the blue light eludes you.  Now you will never know why some stones glow blue.'}
    ]
  },
  {
    title: 'The Ancient Obelisk',
    desc: 'Turning a corner, you see before you a tall obelisk.  It is mostly stone, with blue gems adorning its apex.  Etched into the stone are runic carvings.  You wonder what they say.',
    tags: ['arcane'],
    challenge: {
      attribute: 'mind',
    },
    attack_alias: ['studyrunes', 'You study the runes for a bit.'],
    success: [
      { type: 'output', amount: 'Your many years of studying ancient draconic runes pay off.  You spend the next hour honing up on the history of the world.'},
      { type: 'buff', name: 'slightly smarter for a wee bit', amount: {
        amount: 2, attribute: 'mind', duration: 5
        }
      },
      { type: 'output', amount: 'You feel slightly smarter.  You don\'t know how long that will last though, so you should probably put it to good  use soon.'}
    ],
    fail: [
      { type: 'output', amount: 'Try as you might, you can not suddenly learn to read draconic.  Shame though, you were about to learn the secrets of the universe.  Maybe next time.'}
    ]
  },
  {
    title: 'Pixies',
    desc: 'You hear giggling above you.  Looking up, you see five tiny pixies fluttering and flittering around your head.  "Gam-Bah, Gam-Bah" they all chant, pointing their fingers at you.  Pixie dust falls all over you.  Uh oh, looks like they\'re trying to hex you!',
    challenge: {
      attribute: 'spirit',
    },
    attack_alias: ['resisthex', 'You tense up, doing your kegel exercises and closing your eyes, trying to ward off the presumably-horrible effects of the shimmering dust.'],
    success: [
      { type: 'output', amount: 'You successfully warded off whatever ill effects you may have gotten from the dust.  It never occurred to you that they may be trying to make you fly like Peter Pan.'}
    ],
    fail: [
      { type: 'output', amount: 'The dust gets in your eyes and nose, causing you to sneeze and blink uncontrollably.  You - Achoo! - just - AAAHH CHOOO! - can\'t - SHNAAAAGHOOO! - stop - BLLLLARCHOOO - sneezing!'},
      { type: 'buff', name: 'sneezy', amount: {
        amount: -2, attribute: 'body', duration: 5
        }
      }
    ]
  }
]
