/*
 * getConnection
 */
function getConnection() {
    $.ajax({
        url: "../LIB/smLib/API/connection.php", type: "POST",
        success: function(r) {
            var r = JSON.parse(r);
            var response = r.ret_msg;
            var session = r.session_id;
            var timestamp = r.timestamp;
            if(response == "Approved") { getStatus($('input[name="player"]').val(),session); }
        }
    });
}

/**
 * getStatus
 * @param p
 * @param s
 */
function getStatus(p,s) {
    $.ajax({
        url: "../LIB/smLib/API/getStatus.php", type: "POST",
        data: "player="+p+"&session="+s,
        success: function(json) {
            var r = JSON.parse(json);
            var statusId = r.status;
            var statusString = r.status_string;
            var matchId = r.Match;
            displayStatus(statusString);

            $('#funcStatus').text(statusString);

            emptyTableMatch();
            if(statusId == 3) {
                clearBoard();
                createMatch(matchId, s, 0);
            }else {
                searchEventBind();
            }
        }
    });
}

/**
 * showMatch
 * @param m
 * @param s
 */
function showMatch(m,s) {
    $.ajax({
        url: "../LIB/smLib/API/getPlayers.php", type: "POST",
        data: "matchid="+m,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.Mastery_Level;
                var Queue = player.Queue;
                var playerName = player.playerName;
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

/*
 * show rank with API
 */
function showRankByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "../LIB/smLib/Hybrid/getRankByApi.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&m="+m,
        success: function(rank) {
            showRank(rank,v);
            showKdaByApi(v);
        }
    });
}

/*
 * show kda by API
 */
function showKdaByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "../LIB/smLib/API/getKdaByAPI.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q+"&m="+m,
        success: function(kda) {
            showKda(kda,v);
        }
    });
}

/*
 * show League API
 */
function showLeagueByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "../LIB/smLib/API/getLeagueByAPI.php", type: "POST",
        data: "pi="+pi+"&m="+m,
        success: function(league) {
            showLeague(league,v);
        }
    });
}