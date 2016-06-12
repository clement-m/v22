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

function showRankByApi(pn,gn,v) {
    $.ajax({
        url: "AJAX/getRankByApi.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn,
        success: function(rank) {
            $(v).children('.godrank').empty();
            $(v).children('.godrank').append('<img class="masteryLevel" src="src/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />');
        }
    });
}

function showRankByBDD(pn,gn,v) {
    $.ajax({
        url: "AJAX/getRankByBdd.php",
        type: "POST",
        data: "pn="+pn+"&gn="+gn,
        success: function(rank) {
            console.log(rank);
            if(rank == "") {
                showRankByApi(pn,gn,v);
            } else {
                $(v).children('.godrank').empty();
                $(v).children('.godrank').append('<img class="masteryLevel" src="src/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />');
            }
        }
});
}