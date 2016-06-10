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
            var playerMsg = r.personal_status_message;
            displayStatus(statusString);

            $('#funcStatus').text(statusString);

            emptyTableMatch();
            if(statusId == 3) {
                clearBoard();
                $.when(createMatch(matchId)).then(function(){
                    showMatch(matchId,s);
                });
            }
        }
    });
}

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