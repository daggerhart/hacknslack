var user = {
  'name': 'nate'
};

var items = [
  {
    'name': 'Daddy\'s Blaster',
    'description': 'old hunk o\' junk',
    'effect': 'pew! pew!',
    'bonus': 2,
    'attribute': 'body'
  },
  {
    'name': 'Battery Powered Bread Knife',
    'description': 'exactly what it sounds like',
    'effect': 'bzzzzz!',
    'bonus': 1,
    'attribute': 'spirit'
  },
  {
    'name': 'gray sweatsuit',
    'description': 'so sweaty',
    'bonus': 1,
    'attribute': 'defense'
  }
]

var pc = {
  'player': user,
  'name': 'Ivar',
  'mind': 5,
  'body': 5,
  'spirit': 5,
  'hp': 10,
  'defense': 0,
  'equipment': {
    'weapon': items[0],
    'armor': items[2],
    'gear': null
  }
};

var encounters = [
  {
    'name': 'Wandering peddler',
    'description': 'He seems shady, and tries to pick your pocket!',
    'dc': 5,
    'vs': 'mind',
    'damage': 3
  },
  {
    'name': 'Pit trap',
    'description': 'What a nice day to go for a wa... wtf! oh shit!',
    'dc': 5,
    'vs': 'spirit',
    'damage': 3
  },
  {
    'name': 'Skeleton',
    'description': 'Neat, it still has some of its flesh.',
    'dc': 5,
    'vs': 'body',
    'damage': 3
  }
];

var adventure = {
  'current_encounter': 0,
  'encounters': encounters,
  'completed': false
};

var game = {
};