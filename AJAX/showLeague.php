<?php

$playerId = (isset($_POST['playerId'])) ? $_POST['playerId'] : $_GET['playerId'];
include('../BDD/co.php');
$q = $pdo->prepare("CALL getLeague(:pi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) {
  if(isset($row[0]))
    if($row[0] == "0")
      echo "";
    else
      echo "THERE IS LEAGUE SHOW IT";
}