<?php

// parameters
$r['godName'] = $_POST['gn'];
$r['taskForce'] = $_POST['taskForce'];
$r['Account_Level'] = $_POST['Account_Level'];

// include TWIG
require_once '../lib/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
//$twig = new Twig_Environment($loader, array('cache' => 'cache'));
$loader = new Twig_Loader_Filesystem('../src/Views');
$twig = new Twig_Environment($loader, array('debug' => true));
$twig->addExtension(new Twig_Extension_Debug());
$template = $twig->loadTemplate('player.html.twig');

// include bdd
include('../BDD/co.php');
include('../Match/showMatchFunctions.php');

$result = array();
updateGod($_POST['gi'],$_POST['gn']);
$result['kda'] = getKda($_POST['pi'],$_POST['gi']);
$result['league'] = getLeague($_POST['pi']);

echo $template->render(array('data' => $r))."
<script type=\"text/javascript\">
    alert(".$result['kda'].");
    alert(".$result['league'].");
</script>
";