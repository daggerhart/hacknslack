<?php

function execute_input_action_retreat(){
  return __retreat();
}

function __retreat(){
  ob_start();
  ?>
  <p>Returning to town is probably for the best, you weak lilly-livered jackhole.<br />
  Status: in town</p>
  <?php
  return ob_get_clean();
}
