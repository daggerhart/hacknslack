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
  }
}

//
function _do_current_encounter(){
  if ( adventure.encounters[ adventure.current_encounter ] ) {
    var current_encounter = adventure.encounters[ adventure.current_encounter ];

    __d(current_encounter);

    if ( pc[ current_encounter.vs ] ){
      var attack = rand( 1, pc[ current_encounter.vs ] );

      __d(attack + ' vs ' + current_encounter.dc );

      if ( attack >= current_encounter.dc ){
        __d('you won the encounter!');
      }
      else {
        __d('you lost the encounter');
      }
    }

    _next_encounter();
  }
}
