<?php

include_once('co.php');
$q = $pdo->prepare("CALL getLeagueByBdd(:pi,:q);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('q', $_POST['q'], PDO::PARAM_INT);
$q->execute();
$res = null;
while ($row = $q->fetch()) { $res = $row; }

include_once('baseMethod.php');
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

/*
 * leagueCode
 * getLeagueCode
 */
function leagueCode($num) {
  $res = Array();
  if($num == "0") {
    $res["name"] = "unranked";
    $res["num"] = "";
  } else {
    $mod = $num % 5;
    $div = round($num / 5);
    if($div == 5) {
      $res["name"] = "master";
      $res["num"] = 1;
    }else{
      switch ($mod) {
        case 0: $res["num"] = 1; break;
        case 1: $res["num"] = 5; break;
        case 2: $res["num"] = 4; break;
        case 3: $res["num"] = 3; break;
        case 4: $res["num"] = 2; break;
      }
    }

    if($mod == 0) $div -= 1;

    switch ($div) {
      case 0: $res["name"] = "bronze"; break;
      case 1: $res["name"] = "silver"; break;
      case 2: $res["name"] = "gold"; break;
      case 3: $res["name"] = "platine"; break;
      case 4: $res["name"] = "diamond"; break;
    }
  }
  return $res;
}