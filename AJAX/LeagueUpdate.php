<?php
include('../BDD/co.php');
$q = $pdo->prepare("CALL LeagueUpdate(:pi,:ct,:jt,:dt);");
$q->bindParam('pi', $_POST['playerId'], PDO::PARAM_INT);
$q->bindParam('ct', $_POST['ConqTier'], PDO::PARAM_INT);
$q->bindParam('jt', $_POST['JoustTier'], PDO::PARAM_INT);
$q->bindParam('dt', $_POST['DuelTier'], PDO::PARAM_INT);
$q->execute();