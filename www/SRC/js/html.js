/**
 * showQuickMatch
 * @param dataMatch
 */
function showQuickMatch(dataMatch) {
    $('#table').empty();

    dataMatch.forEach(function(e){
        e.kda = kdaToString(e.kills,e.deaths,e.assists,e.nbMatch);
    });

    $.ajax({ url: "../LIB/smLib/html/quickMatch.php", type: "POST", data: "dataMatch="+JSON.stringify(dataMatch),
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

function kdaToString(k,d,a,nb) {
    var KDA;

    if(nb == 0) KDA = '<img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m.jpg" alt="new" />';
    else {
        var K;
        var D;
        var A;
        var PMI;

        K = (k == 0) ? 0 : k / nb;
        D = (d == 0) ? 0 : d / nb;
        A = (a == 0) ? 0 : a / nb;

        K = parseFloat(K.toFixed(2));
        D = parseFloat(D.toFixed(2));
        A = parseFloat(A.toFixed(2));

        PMI = (K + A) / D;
        PMI = parseFloat(PMI.toFixed(2));

        KDA = K + "/" + D + "/" + A + " pmi: " + PMI;
    }
    return KDA;
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

    len = (mod == 'Ranked: Duel')
        ? $('.table'+' tr').length
        : $('#team'+$team+' tr').length;

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
    $(v).children('.kda').append((kda == "0") ? '<img class="masteryLevel img-responsive newLeague" src="SRC/IMG/masteryLvl/m.jpg" alt="new" />': kda);
}

/**
 * leagueNameToImg
 */
function leagueNameToImg(name){
    $res = "";
    switch (name) {
        case "unranked": return ''; break;
        case "bronze": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/bronze.jpg" alt="bronze" />'; break;
        case "silver": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/silver.jpg" alt="silver" />'; break;
        case "gold": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/gold.jpg" alt="gold" />'; break;
        case "platine": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/platinium.jpg" alt="platinium" />'; break;
        case "platinium": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/platinium.jpg" alt="platinium" />'; break;
        case "diamond": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/diamond.jpg" alt="diamond" />'; break;
    }
}

function leagueNumToImg(num) {
    return (num == 0)
        ? '<img class="masteryLevel img-responsive" src="SRC/IMG/ranks_icons/unranked.jpg" alt="unranked" />'
        : '<img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m' + num + '.jpg" alt="' + num + '" />';
}

/*
 * showLeague
 */
function showLeague(league,v) {
    league = JSON.parse(league);

    $(v).children('.conquest').empty();
    $(v).children('.joust').empty();
    $(v).children('.duel').empty();

    $(v).children('.conquest').append(leagueNameToImg(league.conquest.name) + leagueNumToImg(league.conquest.num));
    $(v).children('.joust').append(leagueNameToImg(league.joust.name) + leagueNumToImg(league.joust.num));
    $(v).children('.duel').append(leagueNameToImg(league.duel.name) + leagueNumToImg(league.duel.num));

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