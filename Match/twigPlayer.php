<?php

/*
 * showMatch
 */
function showMatch($t){
  require_once '../LIB/twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../SRC/Views');
  $twig = new Twig_Environment($loader, array('debug' => true));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('player.html.twig');
  echo $template->render(array('data' => $t));
}