<?php
include_once('../LIB/smLib/co.php');
$req2 = $pdo->prepare("Call createMatch(:m);");
$req2->bindParam('m', $_POST['matchid'], PDO::PARAM_INT);
$req2->execute();

$res = array();
while ($row = $req2->fetch()) {
  if(count($row) == 13) {
    $res['res'][] = $row;
    $res['response'] = "ready";
  }else{
    if(isset($row[1]))
      $res['response'] = "create";

    if(isset($row[0]))
      $res['response'] = "notfinish";
  }
}

echo json_encode($res);