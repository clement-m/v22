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
$league = getAPILeague($playerId);

$league = json_encode($league);

echo $league;