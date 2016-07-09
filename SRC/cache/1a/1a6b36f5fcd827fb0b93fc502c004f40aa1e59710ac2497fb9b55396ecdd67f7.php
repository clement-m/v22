<?php

/* quickPlayer.html.twig */
class __TwigTemplate_b6d373886ab8ad657a747364cb3b0644a7749f20fdccdb9c37bb3ca47531c06f extends Twig_Template
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
        echo "<tr>
    ";
        // line 2
        if (($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "playerId", array()) != 0)) {
            // line 3
            echo "        <td class=\"player\">";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "namePlayer", array()), "html", null, true);
            echo "</td>
        <td class=\"god\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/gods_icons/";
            // line 5
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "nameGod", array()), "html", null, true);
            echo ".jpg\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "nameGod", array()), "html", null, true);
            echo "\" />
        </td>
        <td class=\"account\">";
            // line 7
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "accountLevel", array()), "html", null, true);
            echo "</td>
        <td class=\"rank\">";
            // line 8
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "masteryLevel", array()), "html", null, true);
            echo "</td>
        <td class=\"godrank\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/masteryLvl/m";
            // line 10
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "rank", array()), "html", null, true);
            echo ".jpg\" alt=\"level ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "rank", array()), "html", null, true);
            echo "\" />
        </td>
        <td class=\"kda\">
            ";
            // line 13
            if (($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "kda", array()) == "NaN/NaN/NaN pmi: NaN")) {
                // line 14
                echo "                <img class=\"masteryLevel img-responsive newLeague\" src=\"SRC/IMG/modNoKda/";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "queueId", array()), "html", null, true);
                echo ".jpg\" alt=\"no match yet\" />
            ";
            } else {
                // line 16
                echo "                ";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "kda", array()), "html", null, true);
                echo "
            ";
            }
            // line 18
            echo "        </td>
        <td class=\"conquest leagueWrapper\">
            ";
            // line 20
            if (($this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "conquest", array()), "num", array()) == "")) {
                // line 21
                echo "                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/ranks_icons/unranked.jpg\" alt=\"unranked\" />
            ";
            } else {
                // line 23
                echo "                <img class=\"masteryLevel img-responsive leftFloat\" src=\"SRC/IMG/ranks_icons/";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "conquest", array()), "name", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "conquest", array()), "name", array()), "html", null, true);
                echo "\" />
                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/masteryLvl/m";
                // line 24
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "conquest", array()), "num", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "conquest", array()), "num", array()), "html", null, true);
                echo "\" />
            ";
            }
            // line 26
            echo "        </td>
        <td class=\"joust leagueWrapper\">
            ";
            // line 28
            if (($this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "joust", array()), "num", array()) == "")) {
                // line 29
                echo "                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/ranks_icons/unranked.jpg\" alt=\"unranked\" />
            ";
            } else {
                // line 31
                echo "                <img class=\"masteryLevel img-responsive leftFloat\" src=\"SRC/IMG/ranks_icons/";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "joust", array()), "name", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "joust", array()), "name", array()), "html", null, true);
                echo "\" />
                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/masteryLvl/m";
                // line 32
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "joust", array()), "num", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "joust", array()), "num", array()), "html", null, true);
                echo "\" />
            ";
            }
            // line 34
            echo "        </td>
        <td class=\"duel leagueWrapper\">
            ";
            // line 36
            if (($this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "j1c1", array()), "num", array()) == "")) {
                // line 37
                echo "                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/ranks_icons/unranked.jpg\" alt=\"unranked\" />
            ";
            } else {
                // line 39
                echo "                <img class=\"masteryLevel img-responsive leftFloat\" src=\"SRC/IMG/ranks_icons/";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "j1c1", array()), "name", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "j1c1", array()), "name", array()), "html", null, true);
                echo "\" />
                <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/masteryLvl/m";
                // line 40
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "j1c1", array()), "num", array()), "html", null, true);
                echo ".jpg\" alt=\"";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "j1c1", array()), "num", array()), "html", null, true);
                echo "\" />
            ";
            }
            // line 42
            echo "        </td>
    ";
        } else {
            // line 44
            echo "        <td class=\"player\">
            <img class=\"masteryLevel img-responsive newLeague\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
        <td class=\"god\">
            <img class=\"masteryLevel img-responsive \" src=\"SRC/IMG/gods_icons/";
            // line 48
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "nameGod", array()), "html", null, true);
            echo ".jpg\" alt=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "nameGod", array()), "html", null, true);
            echo "\" />
        </td>
        <td class=\"account\">";
            // line 50
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "accountLevel", array()), "html", null, true);
            echo "</td>
        <td class=\"rank\">";
            // line 51
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "masteryLevel", array()), "html", null, true);
            echo "</td>
        <td class=\"godrank\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
        <td class=\"kda\">
            <img class=\"masteryLevel img-responsive newLeague\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
        <td class=\"conquest leagueWrapper\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
        <td class=\"joust leagueWrapper\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
        <td class=\"duel leagueWrapper\">
            <img class=\"masteryLevel img-responsive\" src=\"SRC/IMG/hidden.jpg\" />
        </td>
    ";
        }
        // line 68
        echo "</tr>";
    }

    public function getTemplateName()
    {
        return "quickPlayer.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  181 => 68,  161 => 51,  157 => 50,  150 => 48,  144 => 44,  140 => 42,  133 => 40,  126 => 39,  122 => 37,  120 => 36,  116 => 34,  109 => 32,  102 => 31,  98 => 29,  96 => 28,  92 => 26,  85 => 24,  78 => 23,  74 => 21,  72 => 20,  68 => 18,  62 => 16,  56 => 14,  54 => 13,  46 => 10,  41 => 8,  37 => 7,  30 => 5,  24 => 3,  22 => 2,  19 => 1,);
    }
}
/* <tr>*/
/*     {% if data.playerId != 0 %}*/
/*         <td class="player">{{ data.namePlayer }}</td>*/
/*         <td class="god">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/gods_icons/{{ data.nameGod }}.jpg" alt="{{ data.nameGod }}" />*/
/*         </td>*/
/*         <td class="account">{{ data.accountLevel }}</td>*/
/*         <td class="rank">{{ data.masteryLevel }}</td>*/
/*         <td class="godrank">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m{{ data.rank }}.jpg" alt="level {{ data.rank }}" />*/
/*         </td>*/
/*         <td class="kda">*/
/*             {% if data.kda == "NaN/NaN/NaN pmi: NaN" %}*/
/*                 <img class="masteryLevel img-responsive newLeague" src="SRC/IMG/modNoKda/{{ data.queueId }}.jpg" alt="no match yet" />*/
/*             {% else %}*/
/*                 {{ data.kda }}*/
/*             {% endif %}*/
/*         </td>*/
/*         <td class="conquest leagueWrapper">*/
/*             {% if data.conquest.num == "" %}*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/ranks_icons/unranked.jpg" alt="unranked" />*/
/*             {% else %}*/
/*                 <img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/{{ data.conquest.name }}.jpg" alt="{{ data.conquest.name }}" />*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m{{ data.conquest.num }}.jpg" alt="{{ data.conquest.num }}" />*/
/*             {% endif %}*/
/*         </td>*/
/*         <td class="joust leagueWrapper">*/
/*             {% if data.joust.num == "" %}*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/ranks_icons/unranked.jpg" alt="unranked" />*/
/*             {% else %}*/
/*                 <img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/{{ data.joust.name }}.jpg" alt="{{ data.joust.name }}" />*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m{{ data.joust.num }}.jpg" alt="{{ data.joust.num }}" />*/
/*             {% endif %}*/
/*         </td>*/
/*         <td class="duel leagueWrapper">*/
/*             {% if data.j1c1.num == "" %}*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/ranks_icons/unranked.jpg" alt="unranked" />*/
/*             {% else %}*/
/*                 <img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/{{ data.j1c1.name }}.jpg" alt="{{ data.j1c1.name }}" />*/
/*                 <img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m{{ data.j1c1.num }}.jpg" alt="{{ data.j1c1.num }}" />*/
/*             {% endif %}*/
/*         </td>*/
/*     {% else %}*/
/*         <td class="player">*/
/*             <img class="masteryLevel img-responsive newLeague" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*         <td class="god">*/
/*             <img class="masteryLevel img-responsive " src="SRC/IMG/gods_icons/{{ data.nameGod }}.jpg" alt="{{ data.nameGod }}" />*/
/*         </td>*/
/*         <td class="account">{{ data.accountLevel }}</td>*/
/*         <td class="rank">{{ data.masteryLevel }}</td>*/
/*         <td class="godrank">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*         <td class="kda">*/
/*             <img class="masteryLevel img-responsive newLeague" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*         <td class="conquest leagueWrapper">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*         <td class="joust leagueWrapper">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*         <td class="duel leagueWrapper">*/
/*             <img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />*/
/*         </td>*/
/*     {% endif %}*/
/* </tr>*/
