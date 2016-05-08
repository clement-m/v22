function start(e) {
    e.preventDefault();
    getConnection();
}

$(document).ready(function(){
    // start prepare
    $('#startInput').focus();
    $('#startInput').keypress(function (e) { if (e.which == 13) start(e); });
    $('#startBtn').click(function(e) { start(e); });

    $('#loader').hide(); // ????

    $(".rank").bind("DOMSubtreeModified", function() {
        alert("tree changed");
    });
});