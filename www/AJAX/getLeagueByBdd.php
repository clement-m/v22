<?php

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getLeagueByBdd(:pi,:q);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('q', $_POST['q'], PDO::PARAM_INT);
$q->execute();
$res = null;
while ($row = $q->fetch()) { $res = $row; }

include_once('../Match/showMatchFunctions.php');
if(isset($res['conquest'])) {
  $Lconq = leagueCode($res['conquest']);
  $Ljoust = leagueCode($res['joust']);
  $Lduel = leagueCode($res['j1c1']);

  $q = $pdo->prepare("CALL updateLeagueMatch(:pi,:c,:j,:j1c1,:m);");
  $q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
  $q->bindParam('c', $res['conquest'], PDO::PARAM_STR);
  $q->bindParam('j', $res['joust'], PDO::PARAM_INT);
  $q->bindParam('j1c1', $res['j1c1'], PDO::PARAM_INT);
  $q->bindParam('m', $_POST['m'], PDO::PARAM_INT);
  $q->execute();

  $res['conquest'] = $Lconq;
  $res['joust'] = $Ljoust;
  $res['duel'] = $Lduel;

  echo json_encode($res);
}else{
  return '';
}
