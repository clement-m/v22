<?php
session_start();
require_once 'LIB/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
// cache ON/OFF
//$twig = new Twig_Environment($loader, array('cache' => 'cache',));
$loader= new Twig_Loader_Filesystem('src/Views');
$twig= new Twig_Environment($loader);
$template= $twig->loadTemplate('index.html.twig');
echo $template->render(array());