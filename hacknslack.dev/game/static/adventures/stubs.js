// adventure stubs
// should include title, desc, tags
// wild, arcane, haunted, town, cavern, 
// bandit, ruins, divine, military, sea

module.exports = [
	{
		title: 'The Veins of Soth',
		desc:  'Deep under Mount Azanon lies the Veins of Soth, a network '
		  +'of caverns said to be the very veins of the dead God Soth. '
		  +'needless to say, you\'ve arrived.',
		tags: ['divine','cavern'],
	},
	{
	  title: "Bloodletter Pass",
	  desc: "Always a bit too far from any garrison, Bloodletter Pass "
	    + "has been a haven for bandits and outlaws of all sorts for "
	    + "generations. Ruins of an ancient empire line the overgrown "
	    + "trail, braved by merchants and travellers desparate, greedy, "
	    + "or both",
	  tags: ['bandit','ruins','wild']
	},
	{
	  title: "Adrift in the Sea of Souls",
	  desc:  "Hearing tales of lost treasure, you seek out the treacherous "
	    + "Sea of Souls!",
	  tags: ['sea','haunted','ruins'],
	},
	{
    title: "Heart of the World",
    desc: "Panacea, the ancient city of all sylvankind, lies in what "
      + "say is the slowly beating heart of the world. Great treasures "
	    + "and dangers await mortals who venture there!",
	  tags: ['town','wild','divine'],
	},
	{
		title: 'Martial Law!',
		desc:  "The town of Dis is under martial law as invaders approach. Can "
		  + "you survive and avoid conscription?",
		tags: ['town','military'],
	},
	{
		title: 'The Weeping Woods',
		desc: "A stategic point between several warring kingdoms, "
		  + "centuries of battle have stained the very soil here crimson.",
		tags: ['haunted','wild','military'],
	},		
]
