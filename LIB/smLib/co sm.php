<?php

try
{
  $db_config = array();
  $db_config['SGBD']  = 'mysql';
  $db_config['HOST']  = 'smitepansnspazki.mysql.db';
  $db_config['DB_NAME'] = 'smitepansnspazki';
  $db_config['USER']  = 'smitepansnspazki';
  $db_config['PASSWORD']  = 'mlkqsdSmite6';
  $db_config['OPTIONS'] = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );
  
  $this->pdo = new PDO(
    $db_config['SGBD'] .':host='. $db_config['HOST'] .';dbname='. $db_config['DB_NAME'],
  $db_config['USER'],
  $db_config['PASSWORD'],
  $db_config['OPTIONS']);

  unset($db_config);
}
catch(PDOException $e)
{
  die('Erreur : ' . $e->getMessage());
}