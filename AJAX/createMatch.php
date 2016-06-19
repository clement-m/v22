<?php
include_once('../LIB/smLib/co.php');
$req2 = $pdo->prepare("Call createMatch(:m);");
$req2->bindParam('m', $_POST['matchid'], PDO::PARAM_INT);
$req2->execute();

$res = array();
while ($row = $req2->fetch()) {
  if(isset($row['ready'])) {
    $res['res'] = $row;
    $res['readyToShow'] = 1;
  }else{
    $res['res'] = $row;
    $res['readyToShow'] = 0;
  }
}

echo json_encode($res);