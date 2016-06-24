<?php

include_once('../LIB/smLib/co.php');
$req2 = $pdo->prepare("Call recreateMatch(:m);");
$req2->execute();