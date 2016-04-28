<?php
$p = (isset($_POST['player']))? $_POST['player'] : $_GET['player'];
$s = (isset($_POST['session']))? $_POST['session'] : $_GET['session'];
$_SESSION['player'] = $p;
$_SESSION['session'] =$s;
include_once('../Controlers/API.php');
$M = new API();
$r = $M->getPlayerStatus($p,$s);
$r = json_decode($r);
$r = json_encode($r[0]);
echo $r;