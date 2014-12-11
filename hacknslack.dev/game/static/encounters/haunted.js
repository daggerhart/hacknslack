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
    title: 'Thirsty Vampire',
    desc: 'You never even heard it coming.  One moment you were enjoying a moonlit walk, in the next it was upon you!',
    tags: ['haunted'],
    challenge: {
      attribute: 'spirit'
    }
  },
  {
    title: 'Suddenly Zombies!',
    desc: 'And from seemingly nowhere, the walking dead appear all around you!',
    tags: ['haunted'],
    challenge: {
      attribute: 'body'
    }
  },
  {
    title: 'The King\'s Spirit',
    desc: 'Standing before you is the ghostly apparition of a helmed man.  The flickering visage beckons you closer. "Do not fear," it says in a gravelly voice.  "I just want to talk."',
    tags: ['haunted'],
    challenge: {
      attribute: 'spirit',
    },
    attack_alias: ['donotfear', '"I am not afraid, I am not afraid, I am not afraid," you repeat to yourself, approaching the spirit.'],
    success: [
      { type: 'output', value: 'You overcome your fear.  The ghostly man takes off his helmet.  "I am the long-dead first king of Azkahdo-Tilah-Solfa-Mirehdo.  I was murdered in my sleep by the Guild of Brevity for naming my kingdom such.  Here is my tale...'},
      { type: 'output', value: 'Much later, you realize you have spent the last five hours listening to this old coot ramble on about his kingdom.  It appears the king is finally wrapping up.'},
      { type: 'output', value: '"Thank you for listening to my tale.  Now I may rest in peace."  He begins flickering, and waves his hands at you.'},
      { type: 'buff', name: 'hearty', value: {
        value: 2, attribute: 'spirit', duration: 10
        }
      },
      { type: 'output', value: '"Be full of heart," he whispers, and is then gone.  Well, at least you got something for wasting your time.'}
    ],
    fail: [
      { type: 'output', value: 'Turns out you\'re afraid.  You run away like the coward you are.'}
    ]
  },
  {
    title: 'Bloody Wall',
    desc: 'A single, lone wall is bleeding.  As far as you know, walls are not supposed to bleed.  There\'s probably a reason for this.  This seems like the kind of thing you should look into.',
    tags: ['haunted'],
    challenge: {
      attribute: 'mind',
    },
    attack_alias: ['lookatblood', 'You look at the blood oozing from the wall, trying to determine the source.'],
    success: [
      { type: 'output', value: 'There appears to be a stab wound in the wall.  You bandage up the hole.'},
      { type: 'output', value: 'The bleeding has stopped.  With your hands covered in wall-blood, you feel good about your deed.  You have saved a wall.  You continue on with your life, knowing that while some walls bleed, at least they can be healed.'}
    ],
    fail: [
      { type: 'output', value: 'With your hands covered in wall-blood, you feel bummed out that you cannot find the source of the bleeding.  Because of this, the wall will likely die, unmourned and alone.'}
    ]
  },
  {
    title: 'Ouija Board',
    desc: 'A ouija board drops out of the sky and lands at your feet.  What an auspicious sign!',
    tags: ['haunted'],
    challenge: {
      attribute: 'mind', /* Hard difficulty, higher than normal rating for level? */
    },
    attack_alias: ['playwithboard', 'You decide to play with the ouija board. Maybe there is a spirit around that has something important to tell you.  What\'s the worst that could happen?'],
    success: [
      { type: 'output', value: 'After asking the usual value of pornographic questions, you find out that this ouija board is in fact the spirit of a DEAD OUIJA BOARD!'},
      { type: 'output', value: 'Dun Dun DUN!'},
      { type: 'output', value: 'It just wanted to play a game and remember it\'s life as a novelty party item.  It thanks you (by spelling out "Thanks") and offers to let you carry it around for awhile.'},
      /*
      { type: 'pet', name: 'Ouija Board', gives spirit bonus}
      */
    ],
    fail: [
      { type: 'output', value: 'You are unable to get the ouija board to communicate anything useful.  Apparently novelty party games are neither useful or informative.'}
    ]
  }
]
