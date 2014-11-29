// encounter stubs
// should include title, desc, challenge attribute
module.exports = [
/*
  {
    title: "",
    desc: "",
    tags: ["military"],
    challenge: {
      attribute: ""
    }
  },
*/
/*
  Body!
*/
  {
    title: "Military checkpoint",
    desc: "While passing through the checkpoint, you're recognized. You'll have to fight your way out!",
    tags: ["military"],
    challenge: {
      attribute: "body"
    }
  },
  {
    title: "Dwarven Camp",
    desc: "You stumble upon a dwarven camp. Their leader customarily challenges you to a friendly brawl!",
    tags: ["military"],
    challenge: {
      attribute: "body"
    }
  },
/*
  Mind!
*/
  {
    title: "Captain Sarge",
    desc: "You stumble upon a bloody and dying guardsman in a dark alley. His last request: solve his murder.",
    tags: ["military"],
    challenge: {
      attribute: "mind"
    },
    actions: [{
      cmd: "attack",
      alias: "solvemurder",
      text: "Give it the college try."
    }]
  },
  {
    title: "Frameup",
    desc: "A local guardsman is trying to implicate you in a crime you did not commit! Prove your innocence!",
    tags: ["military"],
    challenge: {
      attribute: "mind"
    }
  },
  {
    title: "Negotiator",
    desc: "You quite accidently find yourself in the middle of a battlefield between two opposing armies. Your best chance at survival is negotiating peace between the combatants!",
    tags: ["military"],
    challenge: {
      attribute: "mind"
    }
  },
  {
    title: "Gnomish Assault",
    desc: "You find yourself an innocent bystander in a Gnomish Skyship bombardment! Illusions and phantasms writhe all through the air and ground around you! It is the weirdest experience in your life, so far. Can your mind survive?",
    tags: ["military"],
    challenge: {
      attribute: "mind"
    }
  },  
/*
  Spirit!
*/
  {
    title: "Boar Knights!",
    desc: "An orcish patrol has spotted you! Behind them, you hear the terrible snorting of boar knights! Flee for your life!",
    tags: ["military"],
    challenge: {
      attribute: "spirit"
    }
  },
  {
    title: "Paladins of the Saint Bear",
    desc: "Holy Knights of the Saint Bear seek your help in ridding this land of the snake spirits! Give them your support!",
    tags: ["military"],
    challenge: {
      attribute: "spirit"
    }
  },
  {
    title: "Always around but never seen",
    desc: "Admist a bloody battle, a dying ogre demands one last request. Can you answer his riddle?",
    tags: ["military"],
    challenge: {
      attribute: "spirit"
    }
  },    
]
