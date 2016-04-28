<?php
$playerId = (isset($_POST['playerId'])) ? $_POST['playerId'] : $_GET['playerId'];
$GodId = (isset($_POST['godId'])) ? $_POST['godId'] : $_GET['godId'];
$m = (isset($_POST['m'])) ? $_POST['m'] : $_GET['m'];
$s = (isset($_POST['s'])) ? $_POST['s'] : $_GET['s'];
try {
  $db_config = array();
  $db_config['SGBD']	= 'mysql';
  $db_config['HOST']	= 'localhost';
  $db_config['DB_NAME']	= 'sm';
  $db_config['USER']	= 'root';
  $db_config['PASSWORD']	= '';
  $db_config['OPTIONS']	= array(
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );
  $pdo = new PDO(
      $db_config['SGBD'] .':host='. $db_config['HOST'] .';dbname='. $db_config['DB_NAME'],
      $db_config['USER'],
      $db_config['PASSWORD'],
      $db_config['OPTIONS']);
  unset($db_config);
}
catch(PDOException $e) { die('Erreur : ' . $e->getMessage()); }
$q = $pdo->prepare("CALL getRank(:pi,:gi);");
$q->bindParam('pi', $playerId, PDO::PARAM_INT);
$q->bindParam('gi', $GodId, PDO::PARAM_INT);
$q->execute();
while ($row = $q->fetch()) {
  if(isset($row[0])) {
    if($row[0] == "0")
      echo "";
    else
      echo "THERE IS RANK SHOW IT";
  }
}