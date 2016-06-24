<?php
session_start();
require_once '../LIB/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
$loader= new Twig_Loader_Filesystem('SRC/Views');
$twig = new Twig_Environment($loader);
$template= $twig->loadTemplate('index.html.twig');
echo $template->render(array());
