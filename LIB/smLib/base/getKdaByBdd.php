<?php

// getKdaByBdd

include_once('co.php');
$q = $pdo->prepare("CALL getKdaByBdd(:pi,:gi,:q);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->bindParam('q', $_POST['q'], PDO::PARAM_INT);
$q->execute();
if(!$q) { var_dump($pdo->errorInfo()); }

while ($row = $q->fetch()) {
  if(isset($row['kills'])) {
    $avgKill = $row['kills'] / $row['nbMatch'];
    $avgDeath = $row['deaths'] / $row['nbMatch'];
    $avgAssist = $row['assists'] / $row['nbMatch'];
    $PMI;

    if($avgDeath == 0 && $avgAssist == 0) $PMI = 0 - round($avgDeath, 2);
    else if($avgDeath == 0) $PMI = round(($avgKill + $avgAssist), 2);
    else if($avgKill == 0 && $avgAssist == 0 && $avgDeath == 0) $PMI = 0;
    else $PMI = round(($avgKill + $avgAssist) / $avgDeath, 2);

    $res = $avgKill."/".$avgDeath."/".$avgAssist." pmi: ".$PMI;
    echo $res;

    $q = $pdo->prepare("CALL updateKdaMatch(:pi,:gi,:kda,:q,:m);");
    $q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
    $q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
    $q->bindParam('kda', $res, PDO::PARAM_STR);
    $q->bindParam('q', $_POST['q'], PDO::PARAM_STR);
    $q->bindParam('m', $_POST['m'], PDO::PARAM_INT);
    $q->execute();
    if(!$q) { var_dump($pdo->errorInfo()); }
  } else {
    echo "";
  }
}