function __d( data ){
  console.log( data );
}

// show current encounter
function _current_encounter(){
  // loop through adventure encounters
  for( var i = 0; i < adventure.encounters.length; i++ ){
    if ( adventure.current_encounter == i ) {
      var this_encounter = adventure.encounters[ i ];
      __d( this_encounter );
    }
  }
}