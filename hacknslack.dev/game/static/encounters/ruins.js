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
    title: 'Old Crumbling Tower',
    desc: 'Ahead of you is a crumbling tower.  The door is blocked by a cave-in, but there is one window high above.  If you\'ve been practicing your pull-ups like your P.E. teacher always told you, you may be able to get in.',
    tags: ['ruins'],
    challenge: {
      attribute: 'body',
    },
    attack_alias: ['grabwindow', 'You jump up, reaching for the stone window sill.'],
    success: [
      { type: 'output', value: 'Your exercises have finally paid off for something useful!  You are able to pull yourself up through the window.  Inside is a single chest.  You open it.'},
      /*
      { type: 'item', name: '%random magic item%' }
      },
      */
      { type: 'output', value: 'What a pretty bauble!  Surely this will come in handy someday.'}
    ],
    fail: [
      { type: 'output', value: 'You never practiced.  You were a failure in P.E. and you are a failure now. You\'ve never accomplished a single push-up in your life, much less a pull-up, which as everyone knows, is much harder.  Ah well, the mysteries of the crumbling tower shall mysterious.'}
    ]
  },
  {
    title: 'Rubble Everywhere',
    desc: 'The path ahead of you has been mostly blocked by rubble.  Though it looks very dangerous, you can attempt to scale the pile of broken stone, shattered glass, and sharp pointy things.',
    tags: ['ruins'],
    challenge: {
      attribute: 'body',
    },
    attack_alias: ['scalerubble', 'You take a deep breath and haphazardly jump onto the pile, moving up as quickly as possible.'],
    success: [
      { type: 'output', value: 'You climb over the rubble effortlessly.  You could probably do some parkour if you really wanted.  But who would want to do that?'},
      { type: 'output', value: 'On the other side of the rubble, your path continues.  You are rewarded with the ability to continue on your journey.  Go you.'}
    ],
    fail: [
      { type: 'output', value: 'Your parkour skills are not so fancy as you imagine.  You cut your hands, shins, and face on innumerable shards of glass.  Why was there so much glass here?!?!'},
      { type: 'dmg', value: '3'},
      { type: 'output', value: 'You are able to continue on your journey, leaving a trail of blood in your wake.'}
    ]
  }
]
