# Hack N Slack

This was an experiment in learning node.js.  This repo contains a vagrant setup with 2 sites: hacknslack.dev for the game, and node.dev for generic node playground stuff. 

The original intent of this game was to provide a choose your own adventure that could be played through command-line like statements, so that it could be played through slack. I never did the slack intergration, but it wouldn't be too hard.

## Game Models

The game is made up of js modules and can be found in `hacknslack.dev/game`. `system.js` contains the methods necessary to execute the game.Models include:

There is a hierarchy to some of the models:

1. Players have characters
2. Characters have adventures
3. Adventures have encounters

While other objects can be assigned to multiple other object types; "Actions", "effects", "buffs" can all be provided by characters, adventures, encounters, or items.

### Action - `game/node_modules/action.js`

An "action" is a simple object that provides the user with a possible choice. Many other object types can provide actions to the user within a given context. For example: characters, adventures, encounters, and items can provide new possible "actions" to the user.

```
action = {
  // (string) - must be a global action, or refer to a method on the method providing the action
  cmd: "unique_slug",
  
  // (string) - description of the action
  text: "Some action text that explains the option",
  
  // (string) - game generated context for action execution
  context: '',
  
  // (bool) - actions can be hidden from the user.
  // Useful for game utility actions such as "help"
  silent: false,
  
  // (string) - provide a new command for a global action.  cmd: must be set to a global command
  alias: ''
}
```

### Adventure - `game/node_modules/adventure.js`

An adventure is a container for a list of encounters and other details. Adventures can be created as modules such as can be found in the `game/static/acventures/` directory, or they can be randomly generated.

Ideally, any series of events in the game could be an adventure. For example, the character building process in the adventure found in `game/static/adventures/pcBuildStandard.js`

```
adventure = {

  // human readable title of the adventure
  title: '',
  
  // human readable description of the adventure
  description: '',
  
  // (array of strings) tags for this adventure. can be used to get specific encounter types
  tags: [],
  
  // (array of effects) executed when adventure is complete
  success: [
   {effect object},
   {effect object}
  ],
  
  // (array of encounters)
  encounters: [
   { encounter object },
   { encounter object },
  ],
  
  // (array of actions)
  actions: [
   { action object },
   { action object },
  ],
}
```

### Buff - `game/node_modules/buff.js`

A buff is a long-term modification that can be assigned to a character. See `game/static/classes/savage.js` for an example of a buff as an action.

```
buff = {
  // the name / type of this buff
  name: '',

  // value of the buff. can be negative
  value: 0,

  // attribute this buff modifies
  //  - body, mind, spirit, hp
  attribute: '',

  // number of encounters this buff should last
  duration: 0
}
```

### Character - `game/node_modules/character.js`

A "character" object is a saved state of a player's current in-game persona. As a developer, you should never need to create one of these, but you may need to modify the current character through the Game object.

```
character = {
 // (string) - unique character class
 class: String,

 // (Number) - character level
 level: 1,

 // (array of strings) - refer to global actions this character can perform
 actions: ['status', 'equip'],

 // (object) of specific properties, each property's value is an item object
 equipment: {
   weapon: {item},
   armor: {item},
   gear: {item}
 },

 // (object) of specific properties, each property's value is a number
 attributes: {
   body: Number,
   mind: Number,
   spirit: Number,
   hp: Number
 },

 // (array) of item objects
 items:[
   {item},
   {item}
 ],

 // (adventure object) - the character's current adventure
 adventure: {},

 // (Number) - encounter array index
 // current_encounter: 0,
}
```

### Effect - `game/node_modules/effect.js`

An effect is an object that can automatically modify the game state. Generally used to deal damage, heal HP, or provide item drops

```
effect = {
  // (number) - the value of "type" to perform
  value: N,

  // (string) - determines how the value is applied
  type: ( heal | dmg | item | bonus | attack | specific item | output ),
}
```

### Encounter - `game/node_modules/encounter.js`

An encounter is a step (or task) in an adventure. They generally require actions to get past, and may have success and failure effects.

```
encounter = {
  // (string)
  title: "What do you want to to?",
  
  // (string)
  desc: "You are presented with the following choices...",
  
  // (array of strings)
  tags: ['monster', 'arcane'],
  
  // (array of action objects or strings that reference global actions) - this encounterâ€™s contextual actions
  actions: [
   {
     cmd: "attack",
     text: "Attack !"
   },
   { action object },
   'attack' // as a string to reference a global action
  ],
  
  // (number) - difficulty of encounter
  challenge_rating: 3,
  
  // (string) - pc attribute the difficulty challenges
  challenge_attribute: 'body',
  
  // (mixed) - array of effect objects or a callback
  success : [
   { effect object },
   { effect object }
  ],
  
  // (mixed) - array of objects or a callback
  fail : [
   { effect object },
   { effect object }
  ]
}
```

### Item - `game/node_modules/item.js`

An item object is generally something stored within the character inventory, and provides an action.

```
item = {
  // human readable name of item
  name: '',

  // human readable descrption of item
  desc: '',

  // array of effetc objects
  effects: [],

  // array of action objects
  actions: [],

  // (optional) sub-type of an item
  type: ''
}
```


## VM Setup ##

Open a terminal and browse to the folder that contains this repository.  
Type 
```
vagrant up
```

Find something to do for 20 minutes. It will take about that long for it to download and spin up the VM.

### For windows ###

Install git - http://git-scm.com/download/win

Add git's bin to your system path so vagrant ssh will work:

Right click computer > properties > advanced system settings > advanced tab > environment variables button > edit path variable:
and add "C:\%whatever git dir is%\bin" to user path.  eg,  C:\Program Files (x86)\Git\bin

Open the following file as an administrator `c:\windows\system32\drivers\etc\hosts`

Add the lines:

```
192.168.56.101	hacknslack.dev
192.168.56.101	node.dev
```

## SSH into the new VM and start node.js ##

In your terminal, within this repo's directory, login to the vm with:

```
vagrant ssh
```

Then browse to the hackNslack directory:

```
cd /var/www/hacknslack.dev
```

And start the node.js server:

```
node app.js
```

To stop the node server press: `CTRL + C`

Bitbucket: bitbucket.org (/daggerhart/hacknslack)


### Vagrant Commands ###

These commands should be run from within this repo's directory.

* `vagrant up` - Start & check config VM 
* `vagrant provision` - Rechecks config of VM
* `vagrant halt` - Stop the VM
* `vagrant resume` - Resume a halted VM
* `vagrant ssh` - SSH into VM (as sudoer)
