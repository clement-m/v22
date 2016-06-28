<?php

// getLeagueByAPI.php

include_once('apiMethod.php');
$league = getAPILeague($_POST['pi'],$_POST['m']);
$league = json_encode($league);
echo $league;