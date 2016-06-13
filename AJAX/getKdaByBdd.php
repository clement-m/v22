<?php

$playerId = "";
$playerName = $_POST['pn'];
include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getIdPlayerByName(:pn);");
$q->bindParam('pn', $playerName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $playerId = $row['playerId']; }

$godId = "";
$godName = $_POST['gn'];
$q = $pdo->prepare("CALL getIdGodByName(:gn);");
$q->bindParam('gn', $godName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $godId = $row['idGod']; }

$queue = $_POST['q'];
$q = $pdo->prepare("CALL getKdaByBdd(:pi,:gi,:q);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->bindParam('gi', $godId, PDO::PARAM_INT);
$q->bindParam('q', $queue, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) { echo json_encode($row); }