<?php
$pi = (isset($_POST['playerId'])) ? $_POST['playerId'] : $_GET['playerId'];
$s = (isset($_POST['s'])) ? $_POST['s'] : $_GET['s'];
include_once('../Controlers/API.php');
$API = new API();
$r = $API->getRank($pi,$s);
echo json_encode($r);