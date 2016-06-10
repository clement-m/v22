<?php

// include bdd
include('../LIB/smLib/co.php');
include('../Match/showMatchFunctions.php');

$result = array();
updateGod($_POST['gi'],$_POST['gn']);

$result['rank'] = getRank($_POST['pi'],$_POST['gi']);
$result['kda'] = getKda($_POST['pi'],$_POST['gi']);
$result['league'] = getLeague($_POST['pi']);

if(!$result['rank']) {
  $t['godName'] = $_POST['gn'];
  $t['taskForce'] = $_POST['tf'];
  $t['Account_Level'] = $_POST['al'];
  $t['playerName'] = $_POST['pn'];
  $t['mastery_Level'] = $_POST['ml'];

  include_once('../LIB/smLib/API.php');
  $API = new API();

  $rank = $API->getRank($_POST['pi'], $_POST['s']);
  foreach($rank as $aRank) {
    var_dump($aRank);
  }

  $r = $API->getKDA($_POST['pi'], $_POST['q'], $_POST['s']);

  foreach($r as $akda) {
    $Assists = $akda->Assists;
    $Deaths = $akda->Deaths;
    $Kills = $akda->Kills;
    $Losses = $akda->Losses;
    $Gold = $akda->Gold;
    $Wins = $akda->Wins;
    $godName = $akda->God;
    $gi = $akda->GodId;
    $pi = $akda->player_id;
    $ret_msg = $akda->ret_msg;
    $lastPlayed = $akda->LastPlayed;
    $matches = $akda->Matches;
    $minutes = $akda->Minutes;
    $QueueName = $akda->Queue;
    $nbMatch = $Losses + $Wins;
    $avgKills = round($Kills / $nbMatch, 2);
    $avgDeaths = round($Deaths / $nbMatch, 2);
    $avgAssists = round($Assists / $nbMatch, 2);
    if($avgKills == 0 && $avgAssists == 0) $PMI = 0 - round($avgDeaths, 2);
    else if($avgDeaths == 0) $PMI = round(($avgKills + $avgAssists), 2);
    else if($avgKills == 0 && $avgAssists == 0 && $avgDeaths == 0) $PMI = 0;
    else $PMI = round(($avgKills + $avgAssists) / $avgDeaths, 2);

    if ($gi == $_POST['gi']) {

      $t['kda'] = $avgKills . "/" . $avgDeaths . "/" . $avgAssists . " pmi:" . $PMI;
    }
  }
} else {
  echo "else";
}

// include TWIG
require_once '../lib/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
//$twig = new Twig_Environment($loader, array('cache' => 'cache'));
$loader = new Twig_Loader_Filesystem('../src/Views');
$twig = new Twig_Environment($loader, array('debug' => true));
$twig->addExtension(new Twig_Extension_Debug());
$template = $twig->loadTemplate('player.html.twig');

echo $template->render(array('data' => $t));