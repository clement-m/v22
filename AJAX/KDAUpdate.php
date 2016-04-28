<?php
include('../BDD/co.php');
$q = $pdo->prepare("CALL kdaUpdate(:pi,:gi,:queueName,:K,:D,:A,:W,:nbMatch);");
$q->bindParam('pi', $_POST['playerId'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->bindParam('queueName', $_POST['queueName'], PDO::PARAM_STR);
$q->bindParam('K', $_POST['K'], PDO::PARAM_INT);
$q->bindParam('D', $_POST['D'], PDO::PARAM_INT);
$q->bindParam('A', $_POST['A'], PDO::PARAM_INT);
$q->bindParam('W', $_POST['W'], PDO::PARAM_INT);
$q->bindParam('nbMatch', $_POST['nbMatch'], PDO::PARAM_INT);
$q->execute();