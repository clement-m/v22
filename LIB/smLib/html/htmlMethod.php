<?php

/*
 * showMatch
 */
function showMatch($t){
  require_once '../../twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../../../www/SRC/Views');
  $twig = new Twig_Environment($loader, array('cache' => '../../../www/cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('player.html.twig');
  echo $template->render(array('data' => $t));
}

/*
 * quickMatch
 */
function quickMatch($data){
  $data = json_decode($data);
  require_once '../../twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../../../www/SRC/Views');
  $twig = new Twig_Environment($loader, array('cache' => '../../../www/cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('quickPlayer.html.twig');

  $dataTeam2 = array();
  $res = array();
  foreach($data as $k => $vData) {
    $vData->conquest = leagueCode($vData->conquest);
    $vData->joust = leagueCode($vData->joust);
    $vData->j1c1 = leagueCode($vData->j1c1);
    if($vData->taskForce == 2) $dataTeam2[] = $vData;
    else $res['team1HTML'][] = $template->render(array('data' => $vData));
  }

  foreach($dataTeam2 as $k => $vData) {
    $res['team2HTML'][] = $template->render(array('data' => $vData));
  }

  echo json_encode($res);
}

