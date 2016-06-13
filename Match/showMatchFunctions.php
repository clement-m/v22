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
  $res = 0;
  include('../LIB/smLib/co.php');
  $q = $pdo->prepare("CALL getRank(:pi,:gi);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->bindParam('gi', $gi, PDO::PARAM_INT);
  $q->execute();
  while ($row = $q->fetch()) {
    $res = $row;
  }
  return $res;
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
    $Gold = $akda->Gold;
    $Wins = $akda->Wins;
    $godName = $akda->God;
    $rgi = $akda->GodId;
    //$pi = $akda->player_id;
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

    if ($rgi == $gi && $qi == intval($q)) {
      $res = $avgKills . "/" . $avgDeaths . "/" . $avgAssists . " pmi:" . $PMI;
    }
  }
  return $res;
}

function getApiLeague($pi) {
  include_once('../LIB/smLib/API.php');
  $API = new API();
  $r = $API->getLeague($pi);
  $league = $r[0];

  $ConqTier = $league->RankedConquest->Tier;
  $JoustTier = $league->RankedJoust->Tier;
  $DuelTier = $league->RankedDuel->Tier;

  $Lconq = leagueCode($ConqTier);
  $Ljoust = leagueCode($JoustTier);
  $Lduel = leagueCode($DuelTier);

  //var_dump($Lconq);
  //var_dump($Ljoust);
  //var_dump($Lduel);

  $res['conquest'] = $Lconq;
  $res['joust'] = $Ljoust;
  $res['duel'] = $Lduel;

  return $res;
  /*
  $Avatar_URL = $league->Avatar_URL;
  $Created_Datetime = $league->Created_Datetime;
  $playerId = $league->Id;
  $Last_Login_Datetime = $league->Last_Login_Datetime;
  $Leaves = $league->Leaves;
  $Level = $league->Level;
  $Losses = $league->Losses;
  $MasteryLevel = $league->MasteryLevel;
  $Name = $league->Name;
  $Rank_Stat_Conquest = $league->Rank_Stat_Conquest;
  $Rank_Stat_Duel = $league->Rank_Stat_Duel;
  $Rank_Stat_Joust = $league->Rank_Stat_Joust;
  $RankedConquest = $league->RankedConquest;
  $ConqLeaves = $league->RankedConquest->Leaves;
  $ConqLosses = $league->RankedConquest->Losses;
  $ConqName = $league->RankedConquest->Name;
  $ConqPoints = $league->RankedConquest->Points;
  $ConqPrevRank = $league->RankedConquest->PrevRank;
  $ConqRank = $league->RankedConquest->Rank;
  $ConqRank_Stat_Conq = $league->RankedConquest->Rank_Stat_Conquest;
  $ConqRank_Stat_Duel = $league->RankedConquest->Rank_Stat_Duel;
  $ConqRank_Stat_Joust = $league->RankedConquest->Rank_Stat_Joust;
  $ConqSeason = $league->RankedConquest->Season;
  $ConqTier = $league->RankedConquest->Tier;
  $ConqTrend = $league->RankedConquest->Trend;
  $ConqWins = $league->RankedConquest->Wins;
  $Conqpi = $league->RankedConquest->player_id;
  $Conqret_msg = $league->RankedConquest->ret_msg;
  $DuelLeaves = $league->RankedDuel->Leaves;
  $DuelLosses = $league->RankedDuel->Losses;
  $DuelName = $league->RankedDuel->Name;
  $DuelPoints = $league->RankedDuel->Points;
  $DuelPrevRank = $league->RankedDuel->PrevRank;
  $DuelRank = $league->RankedDuel->Rank;
  $DuelRank_Stat_Conq = $league->RankedDuel->Rank_Stat_Conquest;
  $DuelRank_Stat_Duel = $league->RankedDuel->Rank_Stat_Duel;
  $DuelRank_Stat_Joust = $league->RankedDuel->Rank_Stat_Joust;
  $DuelSeason = $league->RankedDuel->Season;
  $DuelTrend = $league->RankedDuel->Trend;
  $DuelWins = $league->RankedDuel->Wins;
  $Duelpi = $league->RankedDuel->player_id;
  $Duelret_msg = $league->RankedDuel->ret_msg;
  $JoustLeaves = $league->RankedJoust->Leaves;
  $JoustLosses = $league->RankedJoust->Losses;
  $JoustName = $league->RankedJoust->Name;
  $JoustPoints = $league->RankedJoust->Points;
  $JoustPrevRank = $league->RankedJoust->PrevRank;
  $JoustRank = $league->RankedJoust->Rank;
  $JoustRank_Stat_Conq = $league->RankedJoust->Rank_Stat_Conquest;
  $JoustRank_Stat_Duel = $league->RankedJoust->Rank_Stat_Duel;
  $JoustRank_Stat_Joust = $league->RankedJoust->Rank_Stat_Joust;
  $JoustSeason = $league->RankedJoust->Season;
  $JoustTrend = $league->RankedJoust->Trend;
  $JoustWins = $league->RankedJoust->Wins;
  $Joustpi = $league->RankedJoust->player_id;
  $Joustret_msg = $league->RankedJoust.ret_msg;
  */

}

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

// function getLeague
function getBddLeague($pi) {
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
  if($Q == "Normal Conquest") {
    $Q = 426;
  }
  if($Q == "Normal: clash") {
    $Q = 466;
  }
  if($Q == "450") {
    $Q = 'ranked joust'; // not ok
  }
  if($Q == "Normal: Siege") {
    $Q = 459; // not ok
  }
  if($Q == "Ranked : Conquest") {
    $Q = 451; // ok
  }
  if($Q == "Ranked : Joust") {
    $Q = 440; // ok
  }
  if($Q == "Normal: MOTD") {
    $Q = 434;
  }

  return $Q;
}