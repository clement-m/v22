<?php

// getRankByAPI.php

include_once('../Match/showMatchFunctions.php');
$rank = getAPIRank($_POST['pi'], $_POST['gi']);

echo $rank;

include('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL updateRankMatch(:pi,:gi,:r,:m);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->bindParam('r', $rank, PDO::PARAM_INT);
$q->bindParam('m', $_POST['m'], PDO::PARAM_INT);
$q->execute();