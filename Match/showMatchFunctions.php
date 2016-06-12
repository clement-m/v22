<?php

function createMatchPlayer($pi,$gi,$m) {
  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call createMatchPlayer(:pi,:gi,:m);");
  $req2->bindParam('pi', $pi, PDO::PARAM_INT);
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('m', $m, PDO::PARAM_INT);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

// function showMatch
function showMatch($t){
  require_once '../lib/twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  //$twig = new Twig_Environment($loader, array('cache' => 'cache'));
  $loader = new Twig_Loader_Filesystem('../src/Views');
  $twig = new Twig_Environment($loader, array('debug' => true));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('player.html.twig');
  echo $template->render(array('data' => $t));
}

// function update player
function updatePlayer($pi,$pn) {
  if($pn != null) {
    include('../LIB/smLib/co.php');
    $req2 = $pdo->prepare("Call updatePlayer(:pi,:pn);");
    $req2->bindParam('pi', $pi, PDO::PARAM_INT);
    $req2->bindParam('pn', $pn, PDO::PARAM_STR);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }
  }
}

// function update god
function updateGod($gi,$gn) {
  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call updateGod(:gi,:gn);");
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('gn', $gn, PDO::PARAM_STR);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

// function getRank
function getRank($pi,$gi) {
  include('../LIB/smLib/co.php');
  $q = $pdo->prepare("CALL getRank(:pi,:gi);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->bindParam('gi', $gi, PDO::PARAM_INT);
  $q->execute();
  while ($row = $q->fetch()) {
    if(isset($row[0]))
      if($row[0] == "0")
        return false;
      else
        return true;
  }
}

/*
 *  $rAssists = $aRank->Assists;
    $rDeaths = $aRank->Deaths;
    $rKills = $aRank->Kills;
    $rLosses = $aRank->Losses;
    $rMinionKills = $aRank->MinionKills;
    $rRank = $aRank->Rank;
    $rWins = $aRank->Wins;
    $rWorshippers = $aRank->Worshippers;
    $rgod = $aRank->god;
    $rgod_id = $aRank->god_id;
    $rplayer_id = $aRank->player_id;
    $rret_msg = $aRank->ret_msg;
 */
function getAPIRank($pi,$gi) {
  $res = 0;

  session_start();
  include_once('../LIB/smLib/API.php');
  $API = new API();
  $rank = $API->getRank($pi, $_SESSION['session']);

  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call recRank(:pi,:gi,:r);");

  foreach($rank as $aRank) {
    $rAssists = $aRank->Assists;
    $rDeaths = $aRank->Deaths;
    $rKills = $aRank->Kills;
    $rLosses = $aRank->Losses;
    $rMinionKills = $aRank->MinionKills;
    $rRank = $aRank->Rank;
    $rWins = $aRank->Wins;
    $rWorshippers = $aRank->Worshippers;
    $rgod = $aRank->god;
    $rgod_id = $aRank->god_id;
    $rplayer_id = $aRank->player_id;
    $rret_msg = $aRank->ret_msg;

    $ppi = intval($rplayer_id);
    $ggi = intval($rgod_id);
    $rr = intval($rRank);

    $req2->bindParam('pi', $ppi, PDO::PARAM_INT);
    $req2->bindParam('gi', $ggi, PDO::PARAM_INT);
    $req2->bindParam('r', $rr, PDO::PARAM_INT);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }

    if($rgod_id == $gi) { $res = $rRank; }
  }
  return $res;
}

// function getKda
function getKda($pi,$gi) {
  include('../LIB/smLib/co.php');
  $q = $pdo->prepare("CALL getGodScore(:pi,:gi);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->bindParam('gi', $gi, PDO::PARAM_INT);
  $q->execute();
  while ($row = $q->fetch()) {
    if(isset($row[0]))
      if($row[0] == "0")
        return false;
      else
        return true;
  }
}

// function API GETKDA
function getAPIKda($pi, $q, $s) {
  $res = 0;

  include_once('../LIB/smLib/API.php');
  $API = new API();
  $r = $API->getKDA($pi, $q, $s);

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

      $res = $avgKills . "/" . $avgDeaths . "/" . $avgAssists . " pmi:" . $PMI;
    }
  }
  return $res;
}

// function getLeague
function getLeague($pi) {
  include('../LIB/smLib/co.php');
  $q = $pdo->prepare("CALL getLeague(:pi);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->execute();
  while ($row = $q->fetch()) {
    if(isset($row[0]))
      if($row[0] == "0")
        return "dzaddddd";
      else
        return "THERE IS LEAGUE SHOW IT";
  }
}