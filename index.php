<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 *
 */

class Hack_N_Slack {

  public $actions = array('attack', 'retreat', 'item', 'status', 'equip');

  public $input = array(
    'action' => '',
    'target' => FALSE,
  );

  public $output = FALSE;

  //
  //
  public $player = array();
  public $pc = array();
  public $adventure = array();


  /**
   *
   * @param $slack - $_POST array from slack
   */
  function __construct( $slack ){
    /*

    token=YHuaZqXEBtuCpcAJV278UKqc
    team_id=T0001
    channel_id=C2147483705
    channel_name=test
    timestamp=1355517523.000005
    user_id=U2147483697
    user_name=Steve
    text=googlebot: What is the air-speed velocity of an unladen swallow?
    trigger_word=googlebot:

    */

    // get the current player from - $slack['user_id']
    $this->player = $this->get_user( $slack['user_id'] );

    // get the current player's current character
    $this->pc = $this->get_current_pc( $this->player );

    // along with the current adventure
    $this->adventure = $this->get_current_adventure( $this->pc );

    // check the slack text for input, and execute it
    $this->input = $this->parse_input( $slack['text'] );

    if ( $this->validate_input( $this->input ) ){
      $this->execute_input( $this->input );
    }
  }


  function get_user( $slack_user_id ){
    return db_query("SELECT * FROM `users` WHERE `slack_user_id` = '$slack_user_id' LIMIT 1");
  }

  function get_current_pc( $player ){
    return db_query("SELECT * FROM `pcs` WHERE `pcid` = '{$player['current_pcid']}' LIMIT 1");
  }

  function get_current_adventure( $pc ){
    return db_query("SELECT * FROM `adventures` WHERE `aid` = '{$pc['current_aid']}' LIMIT 1");
  }

  /**
   * Parse the command into a format with expectations
   *
   * @param $string
   * @return array
   */
  function parse_input( $string ) {
    $input = array(
      'action' => '',
      'target' => FALSE,
    );

    //
    $words = explode(' ', $string );

    $input['action'] = trim( $words[0] );

    // if there is a target
    if ( isset($words[1]) ) {
      $input['target'] = trim( $words[1] );
    }

    return $input;
  }

  /**
   * @param $input
   * @return bool
   */
  function validate_input( $input ) {
    // make sure this action is legit
    if ( in_array( $input['action'], $this->actions ) ) {
      return TRUE;
    }

    return FALSE;
  }

  /**
   * @param $input
   */
  function execute_input( $input ) {
    if (function_exists('execute_input_action_' . $input['action'])) {
      $func = 'execute_input_action_' . $input['action'];
      $this->output = $func( $input['target'] );
    }
  }

  /**
   *
   */
  function display_output() {
    return $this->output;
  }
}


class DataBase {

  private $host = 'localhost';
  private $user = 'root';
  private $pass = 'D0ct0rh4t3r';
  private $db_name = 'demo_dev';

  // the database connection
  private $db;

  /**
   *
   */
  function __construct(){
    $this->db = new mysqli( $this->host, $this->user, $this->pass, $this->db_name);

    if($this->db->connect_errno > 0){
      die('Unable to connect to database [' . $this->db->connect_error . ']');
    }

    return $this->db;
  }
}

/**
 * @param $sql
 * @return bool
 */
function db_query( $sql ){
  global $db;

  $result = $db->query( $sql );

  if ($result){
    return $result;
  }

  return false;
}

$hack = FALSE;

// do the damn deal
if ( isset($_POST['text']) ) {

  include 'actions/attack.php';
  include 'actions/retreat.php';

  $hack = new Hack_N_Slack( $_POST );

  $db = new DataBase();
}

include 'output.php';


