// Create match
function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

// AJAX REC
function recRank(pi,gi,R) {
    $.ajax({ url: "Ajax/recRank.php", type: "POST", data: "pi="+pi+"&gi="+gi+"&R="+R });
}

/*
 * appel la routine de mise à jours des nouveaux dieux
 */
function showMatchProcedure(s, q, ml, al, tf, gn, pi, pn, gi) {
    $.ajax({
        url: "Match/showMatchProcedure.php", type: "POST", data: "s="+s+"&q="+q+"&ml="+ml+"&pn="+pn+"&al="+al+"&tf="+tf+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
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
            if(response == "Approved"){
                getStatus($('input[name="player"]').val(),session);
                putconnectionok('OK');
            }
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

                playerId = parseInt(playerId);
                showMatchProcedure(s,Queue,mastery_Level, Account_Level, taskForce, GodName, playerId, playerName, godId);
            });
        }
    });
}