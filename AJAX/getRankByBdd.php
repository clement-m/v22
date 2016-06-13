<?php

// getRankByBdd.php

$res = null;

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

$q = $pdo->prepare("CALL getRankByBdd(:pi,:gi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->bindParam('gi', $godId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) { $res = $row['rank']; }

echo $res;