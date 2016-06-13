<?php

// getPlayers.php

$m = (isset($_POST['matchid'])) ? $_POST['matchid'] : $_GET['matchid'];
include_once('../LIB/smLib/co.php');
include_once('../LIB/smLib/API.php');
$API = new API();
$r = $API->getMatchPlayer($m);
echo $r;
