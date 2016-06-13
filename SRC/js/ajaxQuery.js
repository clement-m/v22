// Create match
function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

/*
 * appel la routine de mise à jours des nouveaux dieux
 */
function showMatchProcedure(m, s, q, ml, al, tf, gn, pi, pn, gi) {
    $.ajax({
        url: "Match/showMatchProcedure.php", type: "POST", data: "m="+m+"&s="+s+"&q="+q+"&ml="+ml+"&pn="+pn+"&al="+al+"&tf="+tf+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
        success: function (html) { $('#team'+tf).append(html); }
    });
}

// getConnection
function getConnection() {
    $.ajax({
        url: "AJAX/connection.php",
        type: "POST",
        success: function(r) {
            var r = JSON.parse(r);
            var response = r.ret_msg;
            var session = r.session_id;
            var timestamp = r.timestamp;
            if(response == "Approved") { getStatus($('input[name="player"]').val(),session); }
        }
    });
}

// getStatus
function getStatus(p,s) {
    $.ajax({
        url: "AJAX/getStatus.php",
        type: "POST",
        data: "player="+p+"&session="+s,
        success: function(json) {
            var r = JSON.parse(json);
            var statusId = r.status;
            var statusString = r.status_string;
            var ret_msg = r.ret_msg; // null
            var matchId = r.Match;
            var playerMsg = r.personal_status_message; // truc a faire avec
            displayStatus(statusString);

            $('#funcStatus').text(statusString);

            emptyTableMatch();
            if(statusId == 3) {
                clearBoard();
                createMatch(matchId);
                showMatch(matchId,s);
            }
        }
    });
}

// showMatch
function showMatch(m,s) {
    $.ajax({
        url: "AJAX/getPlayers.php",
        type: "POST",
        data: "matchid="+m+"&session="+s,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.Mastery_Level;
                var Match = player.Match;
                var Queue = player.Queue;
                var SkinId = player.SkinId;
                var Tier = player.Tier;
                var playerCreated = player.playerCreated;
                var playerName = player.playerName;
                var ret_msg = player.ret_msg;
                var tierLosses = player.tierLosses;
                var tierWins = player.tierWins;
                var playerId = player.playerId;
                var godId = player.GodId;
                var taskForce = player.taskForce;

                setMod(Queue);

                playerId = parseInt(playerId);
                showMatchProcedure(m,s,Queue,mastery_Level, Account_Level, taskForce, GodName, playerId, playerName, godId);
            });
        }
    });
}

// show rank with API
function showRankByApi(pn,gn,v) {
    $.ajax({
        url: "AJAX/getRankByApi.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn,
        success: function(rank) {
            $(v).children('.godrank').empty();
            $(v).children('.godrank').append('<img class="masteryLevel" src="src/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />API');
        }
    });
}

// show rank with BDD
function showRankByBDD(pn,gn,v) {
    $.ajax({
        url: "AJAX/getRankByBdd.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn,
        success: function(rank) {
            if(rank == "") {
                showLeagueByApi(pn,v);
                showKdaByApi(pn,gn,v);
                showRankByApi(pn,gn,v);
            } else {
                $(v).children('.godrank').empty();
                $(v).children('.godrank').append('<img class="masteryLevel" src="src/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />BDD');


                showKdaByBdd(pn,gn,v);
                // showLeagueByBdd(pn,gn,v);
            }
        }
    });
}

function showLeagueByApi(pn,v) {
    $.ajax({
        url: "AJAX/getLeagueByAPI.php",
        type: "POST",
        data: "pn="+pn,
        success: function(league) {
            league = JSON.parse(league);
            console.log(league);

            $(v).children('.conquest').empty();
            if(league.conquest.name == "unranked") $(v).children('.conquest').append(league.conquest.name);
            else {
                $(v).children('.conquest').append(league.conquest.name);
                $(v).children('.conquest').append('<img src="src/IMG/masteryLvl/m'+league.conquest.num+'.jpg" alt="'+league.conquest.num+'" />');
            }

            $(v).children('.joust').empty();
            if(league.joust.name == "unranked") $(v).children('.joust').append(league.joust.name);
            else {
                $(v).children('.joust').append(league.joust.name);
                $(v).children('.joust').append('<img src="src/IMG/masteryLvl/m'+league.joust.num+'.jpg" alt="'+league.joust.num+'" />');
            }

            $(v).children('.duel').empty();
            if(league.duel.name == "unranked") $(v).children('.duel').append(league.duel.name);
            else {
                $(v).children('.duel').append(league.duel.name);
                $(v).children('.duel').append('<img src="src/IMG/masteryLvl/m'+league.duel.num+'.jpg" alt="'+league.duel.num+'" />');
            }
        }
    });
}

// show kda by BDD
function showKdaByBdd(pn,gn,v){
    var q = $('#mod').attr('data-idMod');
    $.ajax({
        url: "AJAX/getKdaByBdd.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn+"&q="+q,
        success: function(kda) {
            console.log(kda);

            if(kda == "") {
                showLeagueByApi(pn,v);
                showKdaByApi(pn,gn,v);
            } else {
                showLeagueByApi(pn,v); // replace by BDD

                var kda = JSON.parse(kda);

                var k = parseInt(kda['kills']);
                var d = parseInt(kda['deaths']);
                var a = parseInt(kda['assists']);
                var nb = parseInt(kda['nbMatch']);

                var avgKill = k / nb;
                var avgDeath = d / nb;
                var avgAssist = a / nb;
                var PMI;

                if(avgDeath == 0 && avgAssist == 0) PMI = 0 - Math.round(avgDeath, 2);
                else if(avgDeath == 0) PMI = Math.round((avgKill + avgAssist), 2);
                else if(avgKill == 0 && avgAssist == 0 && avgDeath == 0) PMI = 0;
                else PMI = Math.round((avgKill + avgAssist) / avgDeath, 2);

                $(v).children('.kda').empty();
                $(v).children('.kda').append(avgKill + '/' + avgDeath + '/' + avgAssist + ' pmi:' + PMI + ' BDD');
            }
        }
    });
}

// show kda by API
function showKdaByApi(pn,gn,v) {
    var q = $('#mod').attr('data-idMod');
    $.ajax({
        url: "AJAX/getKdaByAPI.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn+"&q="+q,
        success: function(kda) {
            $(v).children('.kda').append(kda + ' API');
        }
    });
}