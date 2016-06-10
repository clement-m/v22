<?php
$m = (isset($_POST['matchid'])) ? $_POST['matchid'] : $_GET['matchid'];
$s = (isset($_POST['session'])) ? $_POST['session'] : $_GET['session'];
include_once('../LIB/smLib/co.php');
include_once('../LIB/smLib/API.php');
$API = new API();
$r = $API->getMatchPlayer($m,$s);
echo $r;
