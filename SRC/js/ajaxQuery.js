
// ajaxQuery.js

/*
 * Create match
 */
function createMatch(m) {
    $.ajax({
        url: "AJAX/createMatch.php", type: "POST",
        data: "matchid="+m
    });
}

/*
 * appel la routine de mise à jours des nouveaux dieux
 */
function showMatchProcedure(m, s, q, ml, al, tf, gn, pi, pn, gi) {
    $.ajax({
        url: "Match/showMatchProcedure.php", type: "POST",
        data: "m="+m+"&s="+s+"&q="+q+"&ml="+ml+"&pn="+pn+"&al="+al+"&tf="+tf+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
        success: function (html) { $('#team'+tf).append(html); }
    });
}

/*
 * getConnection
 */
function getConnection() {
    $.ajax({
        url: "AJAX/connection.php", type: "POST",
        success: function(r) {
            var r = JSON.parse(r);
            var response = r.ret_msg;
            var session = r.session_id;
            var timestamp = r.timestamp;
            if(response == "Approved") { getStatus($('input[name="player"]').val(),session); }
        }
    });
}

/*
 * getStatus
 */
function getStatus(p,s) {
    $.ajax({
        url: "AJAX/getStatus.php", type: "POST",
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
                createMatch(matchId);
                showMatch(matchId,s);
            }
        }
    });
}

/*
 * showMatch
 */
function showMatch(m,s) {
    $.ajax({
        url: "AJAX/getPlayers.php", type: "POST",
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
 * show rank with BDD
 */
function showRankByBDD(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');

    $.ajax({
        url: "AJAX/getRankByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi,
        success: function(rank) {
            if(rank == "") {
                showLeagueByApi(v);
                showKdaByApi(v);
                showRankByApi(v);
            } else {
                showRank(rank,v);
                showKdaByBdd(v);
                showLeagueByBdd(v);
            }
        }
    });
}

/*
 * show rank with API
 */
function showRankByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');

    $.ajax({
        url: "AJAX/getRankByApi.php", type: "POST",
        data: "pi="+pi+"&gi="+gi,
        success: function(rank) { showRank(rank,v); }
    });
}

/*
 * show kda by BDD
 */
function showKdaByBdd(v){
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "AJAX/getKdaByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q,
        success: function(kda) {
            if(kda == "") {
                showKdaByApi(v);
                showLeagueByApi(v);
            } else showKda(kda,v);
        }
    });
}

/*
 * show kda by API
 */
function showKdaByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var q = $('#mod').attr('data-idMod');
    $.ajax({
        url: "AJAX/getKdaByAPI.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q,
        success: function(kda) { showKda(kda,v); }
    });
}

/*
 * show League BDD
 */
function showLeagueByBdd(v) {
    var pi = $(v).children('.player').attr('data-playerId');

    $.ajax({
        url: "AJAX/getLeagueByBdd.php", type: "POST",
        data: "pi="+pi,
        success: function(league) {
            showLeague(league,v);
        }
    });
}

/*
 * show League API
 */
function showLeagueByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');

    $.ajax({
        url: "AJAX/getLeagueByAPI.php", type: "POST",
        data: "pi="+pi,
        success: function(league) { showLeague(league,v); }
    });
}