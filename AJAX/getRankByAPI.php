<?php

$playerName = $_POST['pn'];
$godName = $_POST['gn'];
$playerId = "";
$godId = "";

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
$rank = getAPIRank($playerId, $godId);
echo $rank;