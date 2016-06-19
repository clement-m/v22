<?php

// getRankByBdd.php

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getRankByBdd(:pi,:gi);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->execute();

$res = 0;
while ($row = $q->fetch()) {
  $res = intval($row);
  $row = json_encode($row);
  echo $row;
}

if($res != 1) {
  $q = $pdo->prepare("CALL updateRankMatch(:pi,:gi,:r,:m);");
  $q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
  $q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
  $q->bindParam('r', $res, PDO::PARAM_INT);
  $q->bindParam('m', $_POST['m'], PDO::PARAM_INT);
  $q->execute();
}