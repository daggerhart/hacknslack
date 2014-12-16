module.export = [
  /*{
    name:'',
    desc:'',
    effects:[
      
    ],
    actions:[
      
    ],
    type:''
  },*/
  {
    name:'Potion of Bodiness',
    desc:'This red potion smells like peppermint, and will make you more manly (or womanly).',
    effects:[
      {
        type: 'buff',
        value: {
          name: 'bodied',
          attribute: 'body',
          value: 3,
          duration: 10
        }
      }
    ],
    actions:[
      
    ],
    type:''
  }
]