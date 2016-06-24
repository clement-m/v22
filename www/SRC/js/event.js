function start(e) {
    e.preventDefault();
    clearBoard();
    $('#team1').bind("DOMSubtreeModified", function() { changeTeamEvent(1); });
    $('#team2').bind("DOMSubtreeModified", function() { changeTeamEvent(2); });
    getConnection();
}

function searchEventUnbind() {
    $('#startInput').unbind("keypress");
    $('#startBtn').unbind("click");
}

function searchEventBind() {
    $('#startInput').bind("keypress",function(e){ if (e.which == 13) start(e); });
    $('#startBtn').bind("click",function(e){ start(e); });
}

$(document).ready(function() {
    $('#startInput').focus();
    $('#startInput').keypress(function (e) { if (e.which == 13) start(e); });
    $('#startBtn').click(function(e) { start(e); });
});

