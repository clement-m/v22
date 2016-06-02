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
    $('#gameMod').text(t);
}

// vide le match
function emptyTableMatch() {
    $('#match').empty();
}

// say ok
function putconnectionok(ok) { $('#funcConnexion').text(ok); }