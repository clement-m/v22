<?php

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getLeagueByBdd(:pi);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) { $res = $row; }

include('../Match/showMatchFunctions.php');
$Lconq = leagueCode($res['conquest']);
$Ljoust = leagueCode($res['joust']);
$Lduel = leagueCode($res['j1c1']);

$res['conquest'] = $Lconq;
$res['joust'] = $Ljoust;
$res['duel'] = $Lduel;

echo json_encode($res);