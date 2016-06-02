function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

// AJAX REC
function recRank(pi,gi,R) {
    $.ajax({ url: "Ajax/recRank.php", type: "POST", data: "pi="+pi+"&gi="+gi+"&R="+R });
}

/*
/* appel la routine de mise à jours des nouveaux dieux
 */
function showMatchProcedure(Account_Level,taskForce,gn,pi,pn,gi) {
    $.ajax({
        url: "Match/showMatchProcedure.php", type: "POST", data: "pn="+pn+"&Account_Level="+Account_Level+"&taskForce="+taskForce+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
        success: function (html) {
            console.log(html);
            $('#team'+taskForce).append(html);
        }
    });
}