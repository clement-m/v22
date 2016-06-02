<?php
$r['godName'] = $_POST['GodName'];
$r['taskForce'] = $_POST['taskForce'];
require_once '../lib/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
//$twig = new Twig_Environment($loader, array('cache' => 'cache'));
$loader = new Twig_Loader_Filesystem('../src/Views');
$twig = new Twig_Environment($loader, array('debug' => true));
$twig->addExtension(new Twig_Extension_Debug());
$template = $twig->loadTemplate('player.html.twig');
echo $template->render(array('data' => $r));