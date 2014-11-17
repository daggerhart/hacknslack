<?php

/**
 *
 */
function execute_input_action_attack( $target ){
  global $hack;

  // $hack->adventure['encounters']
  // $hack->player
  // $hack->pc

  return __attack();
}


function __attack() {
  ob_start();
  ?>
  <u>Success</u>
  <p>You successfully best the ____ENCOUNTER TITLE____ !<br />
    (Description) for 6 vs 5<br />
    HP: 20 / 20</p>
  <?php
  return ob_get_clean();
}