
(function($){

  $(document).ready(function(){
    var debug_i = 0;

    var $slack_input = $('#slack-input'),
        $slack_submit = $('#slack-submit');


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

          var $debug_output = $('#debug-output'),
              $slack_output = $('#slack-output');

          $slack_output.prepend( '<div>' + data.payload + '</div>' );

          for ( var i = 0; i < data.debug.length; i++ ){
            $debug_output.prepend( '<div>' + debug_i + ': ' + data.debug[i] + '</div>' );
            console.log( data.debug[ i ] );
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
