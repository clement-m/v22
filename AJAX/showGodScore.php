<?php
$playerId = (isset($_POST['playerId'])) ? $_POST['playerId'] : $_GET['playerId'];
$GodId = (isset($_POST['godId'])) ? $_POST['godId'] : $_GET['godId'];
$m = (isset($_POST['m'])) ? $_POST['m'] : $_GET['m'];
$s = (isset($_POST['s'])) ? $_POST['s'] : $_GET['s'];
include('../BDD/co.php');
$q = $pdo->prepare("CALL getGodScore(:pi,:gi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->bindParam('gi', $GodId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) {
  if(isset($row[0]))
    if($row[0] == "0")
      echo "";
    else
      echo "THERE IS KDA SHOW IT";
}