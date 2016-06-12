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
    $('#playerStatus').text(t);
}

function setMod(Q) {
    console.log(Q);
    if(Q == "448") {
        $('#mod').text('normal joust');
    }
    if(Q == "435") {
        $('#mod').text('arena');
    }
    if(Q == "445") {
        $('#mod').text('assault');
    }
    if(Q == "426") {
        $('#mod').text('normal conquest');
    }
    if(Q == "466") {
        $('#mod').text('clash');
    }
    if(Q == "450") {
        $('#mod').text('ranked joust');
    }
    if(Q == "459") {
        $('#mod').text('siege');
    }
    $('#mod').attr('data-idMod',Q);
}

function changeTeam1Event() {
    var mod = $('#mod').text();
    var len = $('#team1').children().length;

    if( ((mod == 'normal joust' || mod == 'ranked joust') && len == 3) ||
        (mod == 'siege' && len == 4) ||
        ((mod == 'clash' || mod == 'arena' || mod == 'assault' || mod ==  "normal conquest") && len == 5)
    ) {
        $('#team1').unbind("DOMSubtreeModified");

        $('#team1 tr').each(function(k,v) {
            var playerName = $(v).children('.player').text();
            if(playerName != 'Player profile hidden') showRankByBDD(playerName,$(v).children('.god').children().attr('alt'),v);
            else addHiddenPlayerInMatch(v);
        });

        /*
        $('#team1').bind("DOMSubtreeModified", function(event) {
            changeTeam1Event();
        });
        */
    }
}

// vide le match
function emptyTableMatch() { $('#match').empty(); }

// ajoute un utilisateur caché avec les valeurs à "joueur caché"
function addHiddenPlayerInMatch(v) {
    $(v).children('.godrank').empty();
    $(v).children('.godrank').append('Player profile hidden');
    $(v).children('.kda').empty();
    $(v).children('.kda').append('Player profile hidden');
    $(v).children('.leagueWrapper').empty();
    $(v).children('.leagueWrapper').append('Player profile hidden');
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