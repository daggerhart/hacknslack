
(function($){

  $(document).ready(function(){
    var debug_i = 0;

    var $slack_input = $('#slack-input'),
        $slack_submit = $('#slack-submit'),
        $debug_output = $('#debug-output'),
        $slack_output = $('#slack-output');


    $slack_submit.click( function( event ){
      // get the text
      var text = $slack_input.val();

      $.ajax({
        url: '/json',  // custom json route
        dataType: 'json',
        data: {
          'text': text,
          'user_name': $('#user_name').val(),
          'user_id': $('#user_id').val()
        },

        // output success to screen
        success: function( data ){
          debug_i++;

          var output = '<div class="game-turn">';

          // header
          if ( data.character.attributes ) {
            output += '<div class="header">';

            output += 'Name: '
              + data.character.name + ' -- Class: ' + data.character.class.name
              + ' -- HP: ' + data.character.hp + ' / ' + data.character.attributes.hp
              + ' -- AD: ' + ( data.character.current_encounter + 1) + '/' + data.adventure.encounters.length
              + '' + data.adventure.title;

            output += '</div>';
          }

          // results from turn
          output += '<div class="results">';
          output += data.output.join('<br/>');
          output += '</div>';

          // current encounter
          output += '<div class="encounter">';
          // image
          if ( data.image ){
            output += '<div class="turn-image"><img src="' + data.image + '" class="encounter" /></div>';
          }
          output += data.encounter.title + '<br />';
          output += data.encounter.desc + '<br />';
          output += '</div>';

          // actions
          output += '<div class="actions">';
          Object.keys( data.actions ).forEach(function( key ){
            if ( ! data.actions[ key ].silent ) {
              output += '- ' + key + ': ' + data.actions[ key ].text + '<br />';
            }
          });
          output += '</div>'; // .actions
          output += '</div>'; // .game-turn

          // show output
          $slack_output.prepend( output );

          // show debug & error logs
          for ( var i = 0; i < data.debug.length; i++ ){
            $debug_output.prepend( '<div class="debug">' + debug_i + ': ' + data.debug[i] + '</div>' );
            console.log( data.debug[ i ] );
          }

          for ( var i = 0; i < data.errors.length; i++ ){
            $debug_output.prepend( '<div class="error">' + 'ERROR: ' + debug_i + ': ' + data.errors[i] + '</div>' );
            console.log( 'ERROR: ' + data.errors[ i ] );
          }

          $debug_output.prepend('<hr style="border: 1px dashed #bbb;" />');
        }
      });

      // clear the field
      $slack_input.val('');
    });

    // enter key triggers "Send" click
    $slack_input.keypress(function (e) {
      var key = e.which;
      if(key == 13)  // the enter key code
      {
        $slack_submit.click();
        return false;
      }
    });

  });


})(jQuery);
