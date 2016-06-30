<?php

// getRankByAPI.php

include_once('../API/apiMethod.php');
echo getAPIRank($_POST['pi'], $_POST['gi']);
