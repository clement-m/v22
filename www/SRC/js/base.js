// ajaxQuery.js

/**
 * createMatch
 * @param m
 * @param s
 */
function createMatch(m,s,t) {
    t++;
    $.ajax({ url: "../LIB/smLib/base/createMatch.php", type: "POST", data: "matchid="+m,
        success: function (json) {
            var response = JSON.parse(json);
            switch (response.response) {
                case "create": showMatch(m,s); break;
                case "ready":
                    $('#team1').unbind("DOMSubtreeModified");
                    $('#team2').unbind("DOMSubtreeModified");

                    showQuickMatch(response.res);
                    break;
                case "notfinish":
                    if(t == 6) {
                        recreateMatchError(m,s);
                    }else{
                        setTimeout(function(){
                            createMatch(m,s,t);
                        }, 4000);
                    }
                    break;
            }
        }
    });
}

/**
 * recreateMatchError
 * @param m
 */
function recreateMatchError(m,s) {
    $.ajax({ url: "../LIB/smLib/base/recreateMatch.php", type: "POST", data: "matchid="+m });
    showMatch(m,s);
}

/**
 * checkFinish
 */
function checkFinish() {
    var m = $('#team1').children().attr('data-matchId');
    var finish = true;

    $('#team1').children('tr').each(function(e,v){
        finish = $(v).attr('data-done') == "done";
    });

    if(finish) {
        $('#team2').children('tr').each(function(e,v){
            finish = $(v).attr('data-done') == "done";
        });
    }

    if(finish) {
        $.ajax({ url: "../LIB/smLib/base/finishMatch.php", type: "POST", data: "m="+m });
    }
}

/*
 * show rank with BDD
 * ==> Called avec event htmlChange /!\
 */
function showRankByBDD(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "../LIB/smLib/base/getRankByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&m="+m,
        success: function(rank) {
            if(rank == '{"":""}') {
                showRankByApi(v);
            } else {
                rank = JSON.parse(rank);
                rank = rank.rank;
                showRank(rank,v);
            }
            showLeagueByBdd(v);
            showKdaByBdd(v);
        }
    });
}

/*
 * show kda by BDD
 */
function showKdaByBdd(v){
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "../LIB/smLib/base/getKdaByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q+"&m="+m,
        success: function(kda) {
            if(kda == '') {
                showKdaByApi(v);
            } else {
                showKda(kda,v);
            }
        }
    });
}

/*
 * show League BDD
 */
function showLeagueByBdd(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "../LIB/smLib/base/getLeagueByBdd.php", type: "POST",
        data: "pi="+pi+"&q="+q+"&m="+m,
        success: function(league) {
            if(league == '')
                showLeagueByApi(v);
            else
                showLeague(league,v);
        }
    });
}