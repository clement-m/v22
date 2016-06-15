
// htmlChange.js

/*
 * clearBoard
 * vide le tableau de match
 */
function clearBoard() {
    $('#team1').empty();
    $('#team2').empty();
}

/*
 * LeagueAppend
 * affiche la league
 */
function LeagueAppend(GodName, taskForce, league, L) {
    $('#' + taskForce + GodName + ' .' + league).empty();
    if(L.name == "unranked")
        $('#' + taskForce + GodName + ' .'+league).append(
            '<img class="leagueImage col-md-12" src="src/IMG/ranks_icons/' + L.name + '.jpg" alt="' + L.name + ' " />' +
            '<b class="col-md-12 leagueLibelle">unranked</b>'
        );
    else
        $('#' + taskForce + GodName + ' .' + league).append(
            '<div>' +
            '<img class="leagueImage" src="src/IMG/ranks_icons/' + L.name + '.jpg" alt="' + L.name + ' " /> ' +
            '<img src="src/IMG/masteryLvl/m'+L.num+'.jpg" alt="'+L.num+'" />' +
            '</div>' +
            '<b class="col-md-12 leagueLibelle">'+L.name+'</b>'
        );
}

/*
 * displayStatus
 * affiche kelkechose cest koi cet merde ?
 */
function displayStatus(t) {
    if(t == "Unknown") t = 'Player profile is hidden';
    else if(t == null) t = 'Player\'s status is changing retry';
    $('#playerStatus').text(t);
}

/*
 * setMod
 */
function setMod(Q) {
    $('#mod').attr('data-idMod',Q);
    $text = Q;
    switch (Q) {
        case "435": $text = 'Normal: Arena'; break;
        case "448": $text = 'Normal: Joust'; break;
        case "426": $text = 'Normal: Conquest'; break;
        case "466": $text = 'Normal: Clash'; break;
        case "445": $text = 'Normal: Assault'; break;
        case "459": $text = 'Normal: Siege'; break;
        case "434": $text = 'Normal: MOTD'; break;

        case "440": $text = 'Ranked: Duel'; break;
        case "450": $text = 'Ranked: Joust'; break;
        case "451": $text = 'Ranked: Conquest'; break;

        case "438": $text = 'Custom: Arena'; break;
    }
    if($text == Q) $text = "mod not done for smite-pantheon";
    $('#mod').text($text);
}

/*
 * changeTeamEvent
 */
function changeTeamEvent($team) {
    var mod = $('#mod').text();
    var len = $('#team'+$team).children().length;

    var height = $('#team'+$team).height();

    var Players1Height = 90;
    var Players2Height = 190;
    var Players3Height = 290;
    var Players4Height = 390;
    var Players5Height = 480;

    if((mod == 'Ranked: Duel' && height > Players2Height)
    || ((mod == 'Normal: Joust' || mod == 'Ranked: Joust') && height > Players3Height)
    || (mod == 'Normal: Siege' && height > Players4Height)
    || ((mod == 'Normal: MOTD' || mod == 'Ranked: Conquest' || mod == 'Normal: Clash' || mod == 'Normal: Arena' || mod == 'Normal: Assault' || mod ==  "Normal: Conquest") && height > Players5Height)
    ) {
        $('#team'+$team).unbind("DOMSubtreeModified");

        $('#team'+$team+' tr').each(function(k,v) {
            var playerName = $(v).children('.player').text();
            if(playerName != 'Player profile hidden') showRankByBDD(v);
            else addHiddenPlayerInMatch(v);
        });
    }
}

/*
 * emptyTableMatch
 * vide la table de match
 */
function emptyTableMatch() { $('#match').empty(); }

/*
 * addHiddenPlayerInMatch
 * ajoute un utilisateur caché avec les valeurs à "joueur caché"
 */
function addHiddenPlayerInMatch(v) {
    $(v).children('.godrank').empty();
    $(v).children('.kda').empty();
    $(v).children('.leagueWrapper').empty();

    $(v).children('.godrank').append('Player profile hidden');
    $(v).children('.kda').append('Player profile hidden');
    $(v).children('.leagueWrapper').append('Player profile hidden');
}

/*
 * showRank
 */
function showRank(rank,v,way) {
    $(v).children('.godrank').empty();
    $(v).children('.godrank').append('<img class="masteryLevel" src="SRC/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" /> '+way);
}

/*
 * showKda
 */
function showKda(kda,v,way) {
    $(v).children('.kda').empty();
    $(v).children('.kda').append(kda+' '+way);
}

/*
 * showLeague
 */
function showLeague(league,v,way) {
    league = JSON.parse(league);

    $(v).children('.conquest').empty();
    if(league.conquest.name == "unranked") $(v).children('.conquest').append(league.conquest.name+' '+way);
    else {
        $(v).children('.conquest').append(league.conquest.name);
        $(v).children('.conquest').append('<img src="src/IMG/masteryLvl/m'+league.conquest.num+'.jpg" alt="'+league.conquest.num+'" /> '+way);
    }

    $(v).children('.joust').empty();
    if(league.joust.name == "unranked") $(v).children('.joust').append(league.joust.name+' '+way);
    else {
        $(v).children('.joust').append(league.joust.name);
        $(v).children('.joust').append('<img src="src/IMG/masteryLvl/m'+league.joust.num+'.jpg" alt="'+league.joust.num+'" /> '+way);
    }

    $(v).children('.duel').empty();
    if(league.duel.name == "unranked") $(v).children('.duel').append(league.duel.name+' '+way);
    else {
        $(v).children('.duel').append(league.duel.name);
        $(v).children('.duel').append('<img src="src/IMG/masteryLvl/m'+league.duel.num+'.jpg" alt="'+league.duel.num+'" /> '+way);
    }
}

/*
 * renvoie le text du code league correspondant
 * ex : 5 => bronze 3
 */
function leagueCode(num) {
    var res = Array();
    if(num == "0"){
        res["name"] = "unranked";
        res["num"] = "";
    } else {
        mod = num % 5;
        div = Math.round(num / 5);
        if(div == 5) {
            res["name"] = "master";
            res["num"] = 1;
        }else{
            switch (mod) {
                case 0: res["num"] = 1; break;
                case 1: res["num"] = 5; break;
                case 2: res["num"] = 4; break;
                case 3: res["num"] = 3; break;
                case 4: res["num"] = 2; break;
            }
        }
        if(mod == 0) div -= 1;
        switch (div) {
            case 0: res["name"] = "bronze"; break;
            case 1: res["name"] = "silver"; break;
            case 2: res["name"] = "gold"; break;
            case 3: res["name"] = "platine"; break;
            case 4: res["name"] = "diamond"; break;
        }
    }
    return res;
}