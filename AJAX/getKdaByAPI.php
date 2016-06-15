<?php

// getKdaByAPI.php

include_once('../Match/showMatchFunctions.php');
$kda = getAPIKda($_POST['pi'], $_POST['gi'], $_POST['q']);
echo $kda;