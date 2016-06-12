<?php

$playerName = $_POST['pn'];
$godName = $_POST['gn'];
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

$q = $pdo->prepare("CALL getRank(:pi,:gi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->bindParam('gi', $godId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) { $res = $row['rank']; }

echo $res;