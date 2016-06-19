<?php

// showMatchFunctions.php



/*
 * createMatchPlayer
 */
function createMatchPlayer($pi,$gi,$m) {
  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call createMatchPlayer(:pi,:gi,:m);");
  $req2->bindParam('pi', $pi, PDO::PARAM_INT);
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('m', $m, PDO::PARAM_INT);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

/**
 * insertPlayerInMatch
 */
function insertPlayerInMatch($pn,$gn,$tf,$acc,$ml,$m){
  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call insertPlayerInMatch(:m,:pn,:gn,:acc,:ml,:tf);");
  $req2->bindParam('m', $m, PDO::PARAM_INT);
  $req2->bindParam('pn', $pn, PDO::PARAM_STR);
  $req2->bindParam('gn', $gn, PDO::PARAM_STR);
  $req2->bindParam('acc', $acc, PDO::PARAM_INT);
  $req2->bindParam('ml', $ml, PDO::PARAM_INT);
  $req2->bindParam('tf', $tf, PDO::PARAM_INT);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

/*
 * showMatch
 */
function showMatch($t){
  require_once '../LIB/twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../SRC/Views');
  $twig = new Twig_Environment($loader, array('debug' => true, 'cache' => 'cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('player.html.twig');
  echo $template->render(array('data' => $t));
}

/*
 * quickMatch
 */
function quickMatch($data){
  require_once '../LIB/twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../SRC/Views');
  $twig = new Twig_Environment($loader, array('debug' => true, 'cache' => 'cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('quickPlayer.html.twig');
  echo $template->render(array('data' => $data));
}

/*
 * updatePlayer
 */
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

/*
 * updateGod
 */
function updateGod($gi,$gn) {
  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call updateGod(:gi,:gn);");
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('gn', $gn, PDO::PARAM_STR);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

/*
 * getAPIRank
 */
function getAPIRank($pi,$gi) {
  $res = 0;

  session_start();
  include_once('../LIB/smLib/API.php');
  $API = new API();
  $rank = $API->getRank($pi, $_SESSION['session']);

  include_once('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call recRank(:pi,:gi,:r);");

  foreach($rank as $aRank) {
    $rRank = $aRank->Rank;
    $rgod_id = $aRank->god_id;
    $rplayer_id = $aRank->player_id;

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

/*
 * getApiKda
 */
function getAPIKda($pi, $gi, $q) {
  $res = 0;

  include_once('../LIB/smLib/API.php');
  $API = new API();
  $r = $API->getKDA($pi, $q);

  include('../LIB/smLib/co.php');
  $req2 = $pdo->prepare("Call recKda(:pi,:gi,:q,:k,:d,:a,:w,:nb);");

  foreach($r as $akda) {
    $Assists = $akda->Assists;
    $Deaths = $akda->Deaths;
    $Kills = $akda->Kills;
    $Losses = $akda->Losses;
    $Wins = $akda->Wins;
    $rgi = $akda->GodId;
    $QueueName = $akda->Queue;

    $nbMatch = $Losses + $Wins;
    $avgKills = round($Kills / $nbMatch, 2);
    $avgDeaths = round($Deaths / $nbMatch, 2);
    $avgAssists = round($Assists / $nbMatch, 2);

    if($avgKills == 0 && $avgAssists == 0) $PMI = 0 - round($avgDeaths, 2);
    else if($avgDeaths == 0) $PMI = round(($avgKills + $avgAssists), 2);
    else if($avgKills == 0 && $avgAssists == 0 && $avgDeaths == 0) $PMI = 0;
    else $PMI = round(($avgKills + $avgAssists) / $avgDeaths, 2);

    $ppi = intval($pi);
    $ggi = intval($gi);
    $qi = queueNameToId($QueueName);
    $kk = intval($Kills);
    $dd = intval($Deaths);
    $aa = intval($Assists);
    $ww = intval($Wins);
    $nbnb = intval($nbMatch);

    $req2->bindParam('pi', $ppi, PDO::PARAM_INT);
    $req2->bindParam('gi', $ggi, PDO::PARAM_INT);
    $req2->bindParam('q', $qi, PDO::PARAM_INT);
    $req2->bindParam('k', $kk, PDO::PARAM_INT);
    $req2->bindParam('d', $dd, PDO::PARAM_INT);
    $req2->bindParam('a', $aa, PDO::PARAM_INT);
    $req2->bindParam('w', $ww, PDO::PARAM_INT);
    $req2->bindParam('nb', $nbnb, PDO::PARAM_INT);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }

    if ($rgi == $gi && $qi == intval($q))
      $res = $avgKills . "/" . $avgDeaths . "/" . $avgAssists . " pmi:" . $PMI;
  }
  return $res;
}

/*
 * getApiLeague
 */
function getApiLeague($pi,$m) {
  include_once('../LIB/smLib/API.php');
  $API = new API();

  $r = $API->getLeague($pi);
  $league = $r[0];
  $ConqTier = $league->RankedConquest->Tier;
  $JoustTier = $league->RankedJoust->Tier;
  $DuelTier = $league->RankedDuel->Tier;

  include('../LIB/smLib/co.php');
  $q = $pdo->prepare("CALL recLeague(:pi,:c,:j,:d);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->bindParam('c', $ConqTier, PDO::PARAM_INT);
  $q->bindParam('j', $JoustTier, PDO::PARAM_INT);
  $q->bindParam('d', $DuelTier, PDO::PARAM_INT);
  $q->execute();

  $q = $pdo->prepare("CALL updateLeagueMatch(:pi,:c,:j,:j1c1,:m);");
  $q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
  $q->bindParam('c', $ConqTier, PDO::PARAM_INT);
  $q->bindParam('j', $JoustTier, PDO::PARAM_INT);
  $q->bindParam('j1c1', $DuelTier, PDO::PARAM_INT);
  $q->bindParam('m', $m, PDO::PARAM_INT);
  $q->execute();

  $res['conquest'] = leagueCode($ConqTier);
  $res['joust'] = leagueCode($JoustTier);
  $res['duel'] = leagueCode($DuelTier);

  return $res;
}

/*
 * leagueCode
 * getLeagueCode
 */
function leagueCode($num) {
  $res = Array();
  if($num == "0"){
    $res["name"] = "unranked";
        $res["num"] = "";
    } else {
    $mod = $num % 5;
    $div = round($num / 5);
    if($div == 5) {
      $res["name"] = "master";
            $res["num"] = 1;
        }else{
      switch ($mod) {
        case 0: $res["num"] = 1; break;
        case 1: $res["num"] = 5; break;
        case 2: $res["num"] = 4; break;
        case 3: $res["num"] = 3; break;
        case 4: $res["num"] = 2; break;
      }
    }
    if($mod == 0) $div -= 1;
    switch ($div) {
      case 0: $res["name"] = "bronze"; break;
      case 1: $res["name"] = "silver"; break;
      case 2: $res["name"] = "gold"; break;
      case 3: $res["name"] = "platine"; break;
      case 4: $res["name"] = "diamond"; break;
    }
  }
  return $res;
}

/*
 * queueNameToId
 */
function queueNameToId($Q) {
  // DOIT RETOURNER L4ID PAS LE PUTAIN DE NOM
  if($Q == "Normal: Joust") {
    $Q = 448;
  }
  if($Q == "Normal: Arena") {
    $Q = 435;
  }
  if($Q == "Normal: Assault") {
    $Q = 445;
  }
  if($Q == "Normal: Conquest") {
    $Q = 426;
  }
  if($Q == "Normal: clash") {
    $Q = 466;
  }
  if($Q == "450") {
    $Q = 'Ranked: Joust'; // not ok
  }
  if($Q == "Normal: Siege") {
    $Q = 459; // not ok
  }
  if($Q == "Ranked: Conquest") {
    $Q = 451; // ok
  }
  if($Q == "Ranked: Joust") {
    $Q = 440; // ok
  }
  if($Q == "Normal: MOTD") {
    $Q = 434;
  }

  return $Q;
}