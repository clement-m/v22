function start(e) {
    e.preventDefault();
    getConnection();
}

$(document).ready(function() {
    $('#startInput').focus();
    $('#startInput').keypress(function (e) { if (e.which == 13) start(e); });
    $('#startBtn').click(function(e) { start(e); });
    $('#team1').bind("DOMSubtreeModified", function() { changeTeamEvent(1); });
    $('#team2').bind("DOMSubtreeModified", function() { changeTeamEvent(2); });
});
