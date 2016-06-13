<?php

// getRankByAPI.php

$playerId = "";
include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getIdPlayerByName(:pn);");
$q->bindParam('pn', $_POST['pn'], PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $playerId = $row['playerId']; }

$godId = "";
$q = $pdo->prepare("CALL getIdGodByName(:gn);");
$q->bindParam('gn', $_POST['gn'], PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $godId = $row['idGod']; }

include('../Match/showMatchFunctions.php');
$rank = getAPIRank($playerId, $godId);
echo $rank;