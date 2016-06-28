/**
 * showQuickMatch
 * @param dataMatch
 */
function showQuickMatch(dataMatch) {
    var dataMatch = JSON.stringify(dataMatch);

    $('#table').empty();
    $.ajax({ url: "../LIB/smLib/html/quickMatch.php", type: "POST", data: "dataMatch="+dataMatch,
        success: function (html) {
            var response = JSON.parse(html);
            response.team1HTML.forEach(function(data){
                $('#team1').append(data);
            });
            response.team2HTML.forEach(function(data){
                $('#team2').append(data);
            });
        }
    });
}

/*
 * clearBoard
 * vide le tableau de match
 */
function clearBoard() {
    $('#team1').empty();
    $('#team2').empty();
}

/*
 * emptyTableMatch
 * vide la table de match
 */
function emptyTableMatch() { $('#match').empty(); }

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

        case "440": $text = 'Ranked: Duel'; break;
        case "450": $text = 'Ranked: Joust'; break;
        case "451": $text = 'Ranked: Conquest'; break;
        //case "434": $text = 'Normal: MOTD'; break;
        //case "438": $text = 'Custom: Arena'; break;
    }
    if($text == Q) $text = "mod not done for smite-pantheon";
    $('#mod').text($text);
}

/*
 * changeTeamEvent
 */
function changeTeamEvent($team) {
    var mod = $('#mod').text();
    var len = 0;

    if(mod == 'Ranked: Duel')
        len = $('.table'+' tr').length;
    else
        len = $('#team'+$team+' tr').length;

    if ((mod == 'Ranked: Duel' && len > 1)
        || ((mod == 'Normal: Joust' || mod == 'Ranked: Joust') && len > 2)
        || (mod == 'Normal: Siege' && len > 3)
        || ((mod == 'Ranked: Conquest' || mod == 'Normal: Clash' || mod == 'Normal: Arena' || mod == 'Normal: Assault' || mod ==  "Normal: Conquest") && len > 4)
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
 * addHiddenPlayerInMatch
 * ajoute un utilisateur caché avec les valeurs à "joueur caché"
 */
function addHiddenPlayerInMatch(v) {
    $(v).children('.godrank').empty();
    $(v).children('.kda').empty();
    $(v).children('.leagueWrapper').empty();

    $(v).children('.godrank').append('<img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />');
    $(v).children('.kda').append('<img class="masteryLevel img-responsive newLeague" src="SRC/IMG/hidden.jpg" />');
    $(v).children('.leagueWrapper').append('<div class="leagueName"></div><img class="masteryLevel img-responsive newLeague" src="SRC/IMG/hidden.jpg" />');
    $(v).attr('data-done','done');
}

/*
 * showRank
 */
function showRank(rank,v) {
    $(v).children('.godrank').empty();
    $(v).children('.godrank').append('<img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />');
}

/*
 * showKda
 */
function showKda(kda,v) {
    $(v).children('.kda').empty();
    $(v).children('.kda').append(kda);
}

/*
 * showLeague
 */
function showLeague(league,v) {
    league = JSON.parse(league);

    $(v).children('.conquest').empty();
    $(v).children('.joust').empty();
    $(v).children('.duel').empty();

    if(league.conquest.name == "unranked")
        $(v).children('.conquest').append('<div class="leagueName"></div><img class="masteryLevel img-responsive newLeague" src="SRC/IMG/ranks_icons/unranked.jpg" alt="0" />');
    else
        $(v).children('.conquest').append('<div class="leagueName">' + league.conquest.name + '</div><img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m' + league.conquest.num + '.jpg" alt="' + league.conquest.num + '" />');

    if(league.joust.name == "unranked")
        $(v).children('.joust').append('<div class="leagueName"></div><img class="masteryLevel img-responsive newLeague" src="SRC/IMG/ranks_icons/unranked.jpg" alt="0" />');
    else
        $(v).children('.joust').append('<div class="leagueName">' + league.joust.name + '</div><img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m' + league.joust.num + '.jpg" alt="' + league.joust.num + '" />');

    if(league.duel.name == "unranked")
        $(v).children('.duel').append('<div class="leagueName"></div><img class="masteryLevel img-responsive newLeague" src="SRC/IMG/ranks_icons/unranked.jpg" alt="0" />');
    else
        $(v).children('.duel').append('<div class="leagueName">' + league.duel.name + '</div><img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m' + league.duel.num + '.jpg" alt="' + league.duel.num + '" />');

    $(v).attr('data-done','done');
    checkFinish();
}

/*
 * renvoie le text du code league correspondant
 * ex : 5 => bronze 3
 */
function leagueCode(num) {
    var res = Array();
    if(num == "0") {
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