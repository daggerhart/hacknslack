var user = {
  'name': 'nate'
};

var pc = {
  'player': user,
  'mind': 5,
  'body': 5,
  'spirit': 5,
  'hp': 10
};

var encounters = [
  {
    'name': 'Wandering peddler',
    'description': 'He seems shady, and tries to pick your pocket!',
    'dc': 2,
    'vs': 'mind'
  },
  {
    'name': 'Pit trap',
    'description': 'What a nice day to go for a wa... wtf! oh shit!',
    'dc': 2,
    'vs': 'spirit'
  },
  {
    'name': 'Skeleton',
    'description': 'Neat, it still has some of its flesh.',
    'dc': 2,
    'vs': 'body'
  }
];

var adventure = {
  'current_encounter': 0,
  'encounters': encounters
};

var game = {
};