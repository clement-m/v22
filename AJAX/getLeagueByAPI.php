<?php

// getLeagueByAPI.php

include_once('../Match/showMatchFunctions.php');
$league = getAPILeague($_POST['pi']);
$league = json_encode($league);
echo $league;