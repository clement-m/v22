/**
 * CreateMatch appel la BDD a créer le match
 * @param m
 */
function createMatch(m) {
    $.ajax({ url: "Ajax/createMatch.php", type: "POST", data: "matchid="+m });
}

