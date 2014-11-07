function __d( data ){
  console.log( data );
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/*/ show current encounter
function _current_encounter(){
  // loop through adventure encounters
  for( var i = 0; i < adventure.encounters.length; i++ ){
    if ( adventure.current_encounter == i ) {
      var this_encounter = adventure.encounters[ i ];
      __d( this_encounter );
    }
  }
}
// */

//
function _next_encounter(){
  var next = adventure.current_encounter + 1;

  if ( adventure.encounters[ next ] ){
    adventure.current_encounter = next;
  }
  else {
    __d('End of adventure');
    adventure.completed = true;
  }
}

function _pc_attack( current_encounter ){
  //roll attack
  var attack = rand( 1, pc[ current_encounter.vs ] );
  
  // if the PC has a weapon, and the weapon applies to this type of encounter
  if ( pc.equipment.weapon && pc.equipment.weapon.attribute == current_encounter.vs ) {
    __d( pc.name + ' goes "' + pc.equipment.weapon.effect + '" with his ' + pc.equipment.weapon.name + ' for ' + attack + '+' + pc.equipment.weapon.bonus );
    attack += pc.equipment.weapon.bonus;
  }
  
  return attack;
}

function _encounter_lose( current_encounter ){
  var damage = current_encounter.damage;
  //if PC has armor
  if ( pc.equipment.armor ) {
    damage -= pc.equipment.armor.bonus;
    if ( damage < 0) {
      damage = 0;
    }
  }
  
  __d( ' you lost the encounter and took ' + damage + ' damage ' );
    //subtract damage value from pc's current HP
  pc.hp -= damage;
}

//
function _do_current_encounter(){
  if ( adventure.completed ) {
    __d('There are no more encounters left in this adventure.');
    return;
  }
  if ( adventure.encounters[ adventure.current_encounter ] ) {
    var current_encounter = adventure.encounters[ adventure.current_encounter ];

    __d(current_encounter);

    if ( pc[ current_encounter.vs ] ){
      var attack = _pc_attack( current_encounter );

      __d(attack + ' vs ' + current_encounter.dc );

      if ( attack >= current_encounter.dc ){
        __d('you won the encounter!');
      }
      else {
        _encounter_lose( current_encounter );
      }
    }
    __d( pc.name + ' hp: ' + pc.hp );
    _next_encounter();
  }
}
