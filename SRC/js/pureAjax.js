function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

function showPlayer(taskForce,GodName) {
    $.ajax({
        url: "Ajax/showPlayer.php", type: "POST", data: "taskForce="+taskForce+"&GodName="+GodName,
        success: function(html) {
            if(taskForce == 1)
                $('#team1').append(html);
            else
                $('#team2').append(html);
            if (playerName == "") playerName = "Player Hidden";
            $('#' + taskForce + GodName + ' .player').append(playerName + ' (<abbr info="player Level">' + Account_Level + '</abbr>)');
            $('#' + taskForce + GodName + ' .god').append('<img class="godImage" src="src/IMG/gods_icons/' + GodName + '.jpg" alt="' + GodName + '" />');
            $('#' + taskForce + GodName + ' .god .loading').remove();
        }
    });
}

function showRank(playerId,godId,m,s,taskForce,GodName) {
    $.ajax({
        url: "Ajax/showRank.php", type: "POST", data: "playerId="+playerId+"&godId="+godId+"&m="+m+"&s="+s,
        success: function(html) {
            $('#' + taskForce + GodName + ' .rank .loading').remove();
            if($('#' + taskForce + GodName+' .rank').text() == "") {
                $('#' + taskForce + GodName + ' .rank').append(html);
            } else {
                $('#' + taskForce + GodName + ' .rank').append("tamer");
            }
        }
    });
}

function showGodScore(playerId,godId,m,s,taskForce,GodName) {
    $.ajax({
        url: "Ajax/showGodScore.php", type: "POST", data: "playerId="+playerId+"&godId="+godId+"&m="+m+"&s="+s,
        success: function (html) {
            $('#' + taskForce + GodName + ' .kda .loading').remove();
            if($('#' + taskForce + GodName+' .kda').text() == "") {
                $('#' + taskForce + GodName + ' .kda').append(html);
            } else {
                $('#' + taskForce + GodName + ' .kda').append("tamer");
            }
        }
    });
}

function showLeague(playerId,s,taskForce,GodName) {
    $.ajax({
        url: "Ajax/showLeague.php",
        type: "POST",
        data: "playerId=" + playerId + "&=s" + s,
        success: function (html) {
            $('#' + taskForce + GodName + ' .conquest .loading').remove();
            $('#' + taskForce + GodName + ' .joust .loading').remove();
            $('#' + taskForce + GodName + ' .duel .loading').remove();
            if($('#' + taskForce +GodName+' .conquest').text() == "") {
                $('#' + taskForce + GodName + ' .conquest').append(html);
                $('#' + taskForce + GodName + ' .joust').append(html);
                $('#' + taskForce + GodName + ' .duel').append(html);
            } else {
                $('#'+ taskForce  + GodName + ' .conquest').append("tamer");
                $('#'+ taskForce  + GodName + ' .joust').append("tamer");
                $('#'+ taskForce  + GodName + ' .duel').append("tamer");
            }
        }
    });
}