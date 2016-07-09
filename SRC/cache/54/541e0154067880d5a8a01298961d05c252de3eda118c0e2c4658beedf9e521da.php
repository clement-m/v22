<?php

/* player.html.twig */
class __TwigTemplate_4eac5004dae95834e4ce3f5ea1ef16665b0d8e667a956a3b6b01155a7d9441f3 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<tr id=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "taskForce", array()), "html", null, true);
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "godName", array()), "html", null, true);
        echo "\" data-done=\"\" data-matchId=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "matchId", array()), "html", null, true);
        echo "\">
    <td class=\"player\" data-playerId=\"";
        // line 2
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "playerId", array()), "html", null, true);
        echo "\">";
        if (($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "playerName", array()) == null)) {
            echo "Player profile hidden";
        } else {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "playerName", array()), "html", null, true);
        }
        echo "</td>
    <td class=\"god\" data-godId=\"";
        // line 3
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "godId", array()), "html", null, true);
        echo "\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/gods_icons/";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "godName", array()), "html", null, true);
        echo ".jpg\" alt=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "godName", array()), "html", null, true);
        echo "\" /></td>
    <td class=\"account\">";
        // line 4
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "Account_Level", array()), "html", null, true);
        echo "</td>
    <td class=\"rank\">";
        // line 5
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "mastery_Level", array()), "html", null, true);
        echo "</td>
    <td class=\"godrank\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/GIFLOAD/loading.gif\" alt=\"loading\" /></td>
    <td class=\"kda\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/GIFLOAD/loading.gif\" alt=\"loading\" /></td>
    <td class=\"conquest leagueWrapper\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/GIFLOAD/loading.gif\" alt=\"loading\" /></td>
    <td class=\"joust leagueWrapper\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/GIFLOAD/loading.gif\" alt=\"loading\" /></td>
    <td class=\"duel leagueWrapper\"><img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/GIFLOAD/loading.gif\" alt=\"loading\" /></td>
</tr>
";
    }

    public function getTemplateName()
    {
        return "player.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  49 => 5,  45 => 4,  37 => 3,  27 => 2,  19 => 1,);
    }
}
/* <tr id="{{ data.taskForce }}{{ data.godName }}" data-done="" data-matchId="{{ data.matchId }}">*/
/*     <td class="player" data-playerId="{{ data.playerId }}">{% if data.playerName == null %}Player profile hidden{% else %}{{ data.playerName }}{% endif %}</td>*/
/*     <td class="god" data-godId="{{ data.godId }}"><img class="masteryLevel img-responsive" src="SRC/IMG/gods_icons/{{ data.godName }}.jpg" alt="{{ data.godName }}" /></td>*/
/*     <td class="account">{{ data.Account_Level }}</td>*/
/*     <td class="rank">{{ data.mastery_Level }}</td>*/
/*     <td class="godrank"><img class="masteryLevel img-responsive" src="SRC/IMG/GIFLOAD/loading.gif" alt="loading" /></td>*/
/*     <td class="kda"><img class="masteryLevel img-responsive" src="SRC/IMG/GIFLOAD/loading.gif" alt="loading" /></td>*/
/*     <td class="conquest leagueWrapper"><img class="masteryLevel img-responsive" src="SRC/IMG/GIFLOAD/loading.gif" alt="loading" /></td>*/
/*     <td class="joust leagueWrapper"><img class="masteryLevel img-responsive" src="SRC/IMG/GIFLOAD/loading.gif" alt="loading" /></td>*/
/*     <td class="duel leagueWrapper"><img class="masteryLevel img-responsive" src="SRC/IMG/GIFLOAD/loading.gif" alt="loading" /></td>*/
/* </tr>*/
/* */
