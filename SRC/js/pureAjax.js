// Create match
function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

// AJAX REC
function recRank(pi,gi,R) {
    $.ajax({ url: "Ajax/recRank.php", type: "POST", data: "pi="+pi+"&gi="+gi+"&R="+R });
}

/*
 * appel la routine de mise à jours des nouveaux dieux
 */
function showMatchProcedure(s, q, ml, al, tf, gn, pi, pn, gi) {
    $.ajax({
        url: "Match/showMatchProcedure.php", type: "POST", data: "s="+s+"&q="+q+"&ml="+ml+"&pn="+pn+"&al="+al+"&tf="+tf+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
        success: function (html) { $('#team'+tf).append(html); }
    });
}