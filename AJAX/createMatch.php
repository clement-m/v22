<?php
include_once('../LIB/smLib/co.php');
$req2 = $pdo->prepare("Call createMatch(:m);");
$req2->bindParam('m', $_POST['matchid'], PDO::PARAM_INT);
$req2->execute();
if(!$req2) { var_dump($pdo->errorInfo()); }