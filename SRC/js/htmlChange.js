// vide le tableau de match
function clearBoard() {
    $('#team1').empty();
    $('#team2').empty();
}

// affiche la league
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

// affiche kelkechose cest koi cet merde ?
function displayStatus(t) {
    if(t == "Unknown") t = 'Player profile is hidden';
    else if(t == null) t = 'Player\'s status is changing retry';
    $('#gameMod').text(t);
}

// vide le match
function emptyTableMatch() {
    $('#match').empty();
}

// say ok
function putconnectionok(ok) { $('#funcConnexion').text(ok); }

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