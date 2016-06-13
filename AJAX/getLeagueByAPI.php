<?php

// getLeagueByAPI.php

$playerName = $_POST['pn'];

$playerId = "";

include_once('../LIB/smLib/co.php');
$q = $pdo->prepare("CALL getIdPlayerByName(:pn);");
$q->bindParam('pn', $playerName, PDO::PARAM_STR);
$q->execute();
while ($row = $q->fetch()) { $playerId = $row['playerId']; }

include('../Match/showMatchFunctions.php');
$kda = getAPILeague($playerId);
$kda = json_encode($kda);
echo $kda;