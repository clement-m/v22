function showMatchProcedure(taskForce,GodName,playerId,playerName,godId,m,s,Account_Level) {
    showPlayer(taskForce,GodName,playerName,Account_Level);
    showRank(playerId,godId,m,s,taskForce,GodName);
    showGodScore(playerId,godId,m,s,taskForce,GodName);
    showLeague(playerId,s,taskForce,GodName);
}

function clearBoard() {
    $('#team1').empty();
    $('#team2').empty();
}