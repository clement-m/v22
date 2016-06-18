<?php

// getRankByBdd.php

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getRankByBdd(:pi,:gi);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) {
  $row = json_encode($row);
  echo $row;
}