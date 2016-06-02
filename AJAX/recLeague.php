<?php
$R = (isset($_POST['R'])) ? $_POST['R'] : $_GET['R'];
$gi = (isset($_POST['gi'])) ? $_POST['gi'] : $_GET['gi'];
$pi = (isset($_POST['pi'])) ? $_POST['pi'] : $_GET['pi'];
include('../BDD/co.php');
$req2 = $pdo->prepare("Call recRank(:pi,:gi,:r);");
$req2->bindParam('pi', $pi, PDO::PARAM_INT);
$req2->bindParam('gi', $gi, PDO::PARAM_INT);
$req2->bindParam('r', $R, PDO::PARAM_INT);
$req2->execute();
if(!$req2) { var_dump($pdo->errorInfo()); }