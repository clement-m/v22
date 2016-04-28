<?php
include('../BDD/co.php');
$q = $pdo->prepare("CALL RankUpdate(:pi,:gn,:rank);");
$q->bindParam('pi', $_POST['playerId'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->bindParam('rank', $_POST['Rank'], PDO::PARAM_INT);
$q->execute();