<?php

include('../Match/showMatchFunctions.php');

updateGod($_POST['gi'],$_POST['gn']);

$result = array();
$result['rank'] = getRank($_POST['pi'],$_POST['gi']);
$result['kda'] = getKda($_POST['pi'],$_POST['gi']);
$result['league'] = getLeague($_POST['pi']);

if(!$result['rank']) {
  $t['godName'] = $_POST['gn'];
  $t['taskForce'] = $_POST['tf'];
  $t['Account_Level'] = $_POST['al'];
  $t['playerName'] = $_POST['pn'];
  $t['mastery_Level'] = $_POST['ml'];

  $t['rank'] = getAPIRank($_POST['pi'], $_POST['s'], $_POST['gi']);
  $t['kda'] = getAPIKda($_POST['pi'],$_POST['q'],$_POST['s']);
}
else echo "else";

showMatch($t);