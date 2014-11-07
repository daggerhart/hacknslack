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
    'name': 'Gray sweatsuit',
    'description': 'sweaty sweaty',
    'dc': 2
  },
  {
    'name': 'Mostly-functional Heat Rifle',
    'description': 'somewhat functional',
    'dc': 2
  }
];

var adventure = {
  'current_encounter': 0,
  'encounters': encounters
};

var game = {
};