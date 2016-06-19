<?php

// getKdaByAPI.php

include_once('../Match/showMatchFunctions.php');
$kda = getAPIKda($_POST['pi'], $_POST['gi'], $_POST['q']);
echo $kda;

include('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL updateKdaMatch(:pi,:gi,:kda,:q,:m);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->bindParam('kda', $kda, PDO::PARAM_STR);
$q->bindParam('q', $_POST['q'], PDO::PARAM_INT);
$q->bindParam('m', $_POST['m'], PDO::PARAM_INT);
$q->execute();