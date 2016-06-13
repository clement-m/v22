<?php

$playerId = "";
$playerName = $_POST['pn'];
include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getIdPlayerByName(:pn);");
$q->bindParam('pn', $playerName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $playerId = $row['playerId']; }

$q = $pdo->prepare("CALL getLeagueByBdd(:pi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) { $res = $row; }

$ConqTier = $res['conquest'];
$JoustTier = $res['joust'];
$DuelTier = $res['j1c1'];

include('../Match/showMatchFunctions.php');
$Lconq = leagueCode($ConqTier);
$Ljoust = leagueCode($JoustTier);
$Lduel = leagueCode($DuelTier);

$res['conquest'] = $Lconq;
$res['joust'] = $Ljoust;
$res['duel'] = $Lduel;

echo json_encode($res);