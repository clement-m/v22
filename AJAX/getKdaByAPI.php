<?php

$playerName = $_POST['pn'];
$godName = $_POST['gn'];
$queue = $_POST['q'];
$playerId = "";
$godId = "";

$res = null;

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getIdPlayerByName(:pn);");
$q->bindParam('pn', $playerName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $playerId = $row['playerId']; }

$q = $pdo->prepare("CALL getIdGodByName(:gn);");
$q->bindParam('gn', $godName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $godId = $row['idGod']; }

include('../Match/showMatchFunctions.php');
$rank = getAPIKda($playerId, $godId, $queue);
echo $rank;