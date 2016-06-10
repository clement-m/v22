<?php
$pi = (isset($_POST['playerId'])) ? $_POST['playerId'] : $_GET['playerId'];
$q = (isset($_POST['queue'])) ? $_POST['queue'] : $_GET['queue'];
$s = (isset($_POST['s'])) ? $_POST['s'] : $_GET['s'];
include_once('../LIB/smLib/API.php');
$API = new API();
$r = $API->getKDA($pi,$q,$s);
echo json_encode($r);