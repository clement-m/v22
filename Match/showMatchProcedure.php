<?php

$templateParams['godName'] = $_POST['gn'];
$templateParams['taskForce'] = $_POST['tf'];
$templateParams['Account_Level'] = $_POST['al'];
$templateParams['playerName'] = $_POST['pn'];
$templateParams['mastery_Level'] = $_POST['ml'];

include('../Match/showMatchFunctions.php');

updatePlayer($_POST['pi'],$_POST['pn']);
updateGod($_POST['gi'],$_POST['gn']);

showMatch($templateParams);

//$result = array();
//$rank = getRank($_POST['pi'],$_POST['gi']);
//$kda = getKda($_POST['pi'],$_POST['gi']);
//$league = getLeague($_POST['pi']);

//if(!$rank) {
  //$templateParams['rank'] = getAPIRank($_POST['pi'], $_POST['s'], $_POST['gi']);
  //$templateParams['kda'] = getAPIKda($_POST['pi'],$_POST['q'],$_POST['s']);
//}
//else echo "else";