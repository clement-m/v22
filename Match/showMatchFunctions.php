<?php

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