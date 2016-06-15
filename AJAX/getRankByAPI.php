<?php

// getRankByAPI.php

include('../Match/showMatchFunctions.php');
$rank = getAPIRank($_POST['pi'], $_POST['gi']);
echo $rank;