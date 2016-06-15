<?php

// getRankByAPI.php

include_once('../Match/showMatchFunctions.php');
$rank = getAPIRank($_POST['pi'], $_POST['gi']);
echo $rank;