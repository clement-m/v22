function getConnection() {
    $.ajax({
        url: "Ajax/connection.php",
        type: "POST",
        success: function(r) {
            var r = JSON.parse(r);
            var response = r.ret_msg;
            var session = r.session_id;
            var timestamp = r.timestamp;
            if(response == "Approved"){
                getStatus($('input[name="player"]').val(),session);
                putconnectionok('OK');
            }
        }
    });
}

function getStatus(p,s) {
    $.ajax({
        url: "Ajax/getStatus.php",
        type: "POST",
        data: "player="+p+"&session="+s,
        success: function(json) {
            var r = JSON.parse(json);
            var statusId = r.status;
            var statusString = r.status_string;
            var ret_msg = r.ret_msg; // null
            var matchId = r.Match;
            var playerMsg = r.personal_status_message;
            displayStatus(statusString);

            $('#funcStatus').text(statusString);

            emptyTableMatch();
            if(statusId == 3) {
                clearBoard();
                $.when(createMatch(matchId)).then(function(){
                    showMatch(matchId,s);
                });
            }
        }
    });
}

function showMatch(m,s) {
    var rankAssists;
    var rankDeaths;
    var rankKills;
    var rankLosses;
    var rankMinionKills;
    var rankRank; // toshow
    var rankWins;
    var rankWorshippers; // toshow
    var rankgodName;
    var rankgi;
    var rankpi;
    var rankret_msg;

    var kdaAssists;
    var kdaDeaths;
    var kdaKills;
    var kdaLosses;
    var kdaGold;
    var kdaWins;
    var kdagodName;
    var kdagi;
    var kdapi;
    var kdaret_msg;
    var kdalastPlayed;
    var kdamatches;
    var kdaminutes;
    var kdaQueueName;
    var kdanbMatch;
    var kdaavgKills;
    var kdaavgDeaths;
    var kdaavgAssists;
    var kdaPMI;

    var leagueAvatar_URL;
    var leagueCreated_Datetime;
    var leagueplayerId;
    var leagueLast_Login_Datetime;
    var leagueLeaves;
    var leagueLevel;
    var leagueLosses;
    var leagueMasteryLevel;
    var leagueName;
    var leagueRank_Stat_Conquest;
    var leagueRank_Stat_Duel;
    var leagueRank_Stat_Joust;
    var leagueRankedConquest;
    var leagueConqLeaves;
    var leagueConqLosses;
    var leagueConqName;
    var leagueConqPoints;
    var leagueConqPrevRank;
    var leagueConqRank;
    var leagueConqRank_Stat_Conq;
    var leagueConqRank_Stat_Duel;
    var leagueConqRank_Stat_Joust;
    var leagueConqSeason;
    var leagueConqTier;
    var leagueConqTrend;
    var leagueConqWins;
    var leagueConqpi;
    var leagueConqret_msg;
    var leagueDuelLeaves;
    var leagueDuelLosses;
    var leagueDuelName;
    var leagueDuelPoints;
    var leagueDuelPrevRank;
    var leagueDuelRank;
    var leagueDuelRank_Stat_Conq;
    var leagueDuelRank_Stat_Duel;
    var leagueDuelRank_Stat_Joust;
    var leagueDuelSeason;
    var leagueDuelTier;
    var leagueDuelTrend;
    var leagueDuelWins;
    var leagueDuelpi;
    var leagueDuelret_msg;
    var leagueJoustLeaves;
    var leagueJoustLosses;
    var leagueJoustName ;
    var leagueJoustPoints;
    var leagueJoustPrevRank;
    var leagueJoustRank;
    var leagueJoustRank_Stat_Conq;
    var leagueJoustRank_Stat_Duel;
    var leagueJoustRank_Stat_Joust;
    var leagueJoustSeason;
    var leagueJoustTier;
    var leagueJoustTrend;
    var leagueJoustWins;
    var leagueJoustpi;
    var leagueJoustret_msg;

    $.ajax({
        url: "Ajax/getPlayers.php",
        type: "POST",
        data: "matchid="+m+"&session="+s,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.mastery_Level;
                var Match = player.Match;
                var Queue = player.Queue;
                var SkinId = player.SkinId;
                var Tier = player.Tier;
                var playerCreated = player.playerCreated;
                var playerName = player.playerName;
                var ret_msg = player.ret_msg;
                var tierLosses = player.tierLosses;
                var tierWins = player.tierWins;
                var playerId = player.playerId;
                var godId = player.GodId;
                var taskForce = player.taskForce;

                playerId = parseInt(playerId);

                showMatchProcedure(Account_Level, taskForce, GodName, playerId, playerName, godId);
                $('#funcShowDataStored').text('OK');
                alert('dataok');
            });
        }
    });

    $.ajax({
        url: "Ajax/getPlayers.php",
        type: "POST",
        data: "matchid="+m+"&session="+s,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.mastery_Level;
                var Match = player.Match;
                var Queue = player.Queue;
                var SkinId = player.SkinId;
                var Tier = player.Tier;
                var playerCreated = player.playerCreated;
                var playerName = player.playerName;
                var ret_msg = player.ret_msg;
                var tierLosses = player.tierLosses;
                var tierWins = player.tierWins;
                var playerId = player.playerId;
                var godId = player.GodId;
                var taskForce = player.taskForce;

                var playerId = parseInt(playerId);

                $.ajax({
                    url: "api/getKDA.php",
                    type: "POST",
                    data: "playerId=" + playerId + "&queue=" + Queue + "&s=" + s,
                    success: function (json2) {
                        var kda = JSON.parse(json2);
                        kda.forEach(function (akda) {
                            kdaAssists = akda.Assists;
                            kdaDeaths = akda.Deaths;
                            kdaKills = akda.Kills;
                            kdaLosses = akda.Losses;
                            kdaGold = akda.Gold;
                            kdaWins = akda.Wins;
                            kdagodName = akda.God;
                            kdagi = akda.GodId;
                            kdapi = akda.player_id;
                            kdaret_msg = akda.ret_msg;
                            kdalastPlayed = akda.LastPlayed;
                            kdamatches = akda.Matches;
                            kdaminutes = akda.Minutes;
                            kdaQueueName = akda.Queue;
                            kdanbMatch = kdaLosses + kdaWins;
                            kdaavgKills = Math.round(kdaKills / kdanbMatch, 2);
                            kdaavgDeaths = Math.round(kdaDeaths / kdanbMatch, 2);
                            kdaavgAssists = Math.round(kdaAssists / kdanbMatch, 2);
                            kdaPMI = Math.round((kdaavgKills + kdaavgAssists) / kdaavgDeaths, 2);

                            if (kdagi == godId) {
                                $('#'+ taskForce  + GodName + ' .kda').empty();
                                $('#'+ taskForce  + GodName + ' .kda').append(kdaavgKills + "/" + kdaavgDeaths + "/" + kdaavgAssists + " pmi:" + kdaPMI);
                            }
                        });
                        $('#funcAPIGetKda').text('OK');
                    }
                });
                $.ajax({
                    url: "api/getLeague.php",
                    type: "POST",
                    data: "playerId=" + playerId + "&s=" + s,
                    success: function (json) {
                        var league = JSON.parse(json);
                        league.forEach(function (aleague) {
                            leagueAvatar_URL = aleague.Avatar_URL;
                            leagueCreated_Datetime = aleague.Created_Datetime;
                            leagueplayerId = aleague.Id;
                            leagueLast_Login_Datetime = aleague.Last_Login_Datetime;
                            leagueLeaves = aleague.Leaves;
                            leagueLevel = aleague.Level;
                            leagueLosses = aleague.Losses;
                            leagueMasteryLevel = aleague.MasteryLevel;
                            leagueName = aleague.Name;
                            leagueRank_Stat_Conquest = aleague.Rank_Stat_Conquest;
                            leagueRank_Stat_Duel = aleague.Rank_Stat_Duel;
                            leagueRank_Stat_Joust = aleague.Rank_Stat_Joust;
                            leagueRankedConquest = aleague.RankedConquest;
                            leagueConqLeaves = aleague.RankedConquest.Leaves;
                            leagueConqLosses = aleague.RankedConquest.Losses;
                            leagueConqName = aleague.RankedConquest.Name;
                            leagueConqPoints = aleague.RankedConquest.Points;
                            leagueConqPrevRank = aleague.RankedConquest.PrevRank;
                            leagueConqRank = aleague.RankedConquest.Rank;
                            leagueConqRank_Stat_Conq = aleague.RankedConquest.Rank_Stat_Conquest;
                            leagueConqRank_Stat_Duel = aleague.RankedConquest.Rank_Stat_Duel;
                            leagueConqRank_Stat_Joust = aleague.RankedConquest.Rank_Stat_Joust;
                            leagueConqSeason = aleague.RankedConquest.Season;
                            leagueConqTier = aleague.RankedConquest.Tier;
                            leagueConqTrend = aleague.RankedConquest.Trend;
                            leagueConqWins = aleague.RankedConquest.Wins;
                            leagueConqpi = aleague.RankedConquest.player_id;
                            leagueConqret_msg = aleague.RankedConquest.ret_msg;
                            leagueDuelLeaves = aleague.RankedDuel.Leaves;
                            leagueDuelLosses = aleague.RankedDuel.Losses;
                            leagueDuelName = aleague.RankedDuel.Name;
                            leagueDuelPoints = aleague.RankedDuel.Points;
                            leagueDuelPrevRank = aleague.RankedDuel.PrevRank;
                            leagueDuelRank = aleague.RankedDuel.Rank;
                            leagueDuelRank_Stat_Conq = aleague.RankedDuel.Rank_Stat_Conquest;
                            leagueDuelRank_Stat_Duel = aleague.RankedDuel.Rank_Stat_Duel;
                            leagueDuelRank_Stat_Joust = aleague.RankedDuel.Rank_Stat_Joust;
                            leagueDuelSeason = aleague.RankedDuel.Season;
                            leagueDuelTier = aleague.RankedDuel.Tier;
                            leagueDuelTrend = aleague.RankedDuel.Trend;
                            leagueDuelWins = aleague.RankedDuel.Wins;
                            leagueDuelpi = aleague.RankedDuel.player_id;
                            leagueDuelret_msg = aleague.RankedDuel.ret_msg;
                            leagueJoustLeaves = aleague.RankedJoust.Leaves;
                            leagueJoustLosses = aleague.RankedJoust.Losses;
                            leagueJoustName = aleague.RankedJoust.Name;
                            leagueJoustPoints = aleague.RankedJoust.Points;
                            leagueJoustPrevRank = aleague.RankedJoust.PrevRank;
                            leagueJoustRank = aleague.RankedJoust.Rank;
                            leagueJoustRank_Stat_Conq = aleague.RankedJoust.Rank_Stat_Conquest;
                            leagueJoustRank_Stat_Duel = aleague.RankedJoust.Rank_Stat_Duel;
                            leagueJoustRank_Stat_Joust = aleague.RankedJoust.Rank_Stat_Joust;
                            leagueJoustSeason = aleague.RankedJoust.Season;
                            leagueJoustTier = aleague.RankedJoust.Tier;
                            leagueJoustTrend = aleague.RankedJoust.Trend;
                            leagueJoustWins = aleague.RankedJoust.Wins;
                            leagueJoustpi = aleague.RankedJoust.player_id;
                            leagueJoustret_msg = aleague.RankedJoust.ret_msg;
                            LeagueAppend(GodName, taskForce, "conquest", leagueCode(leagueConqTier));
                            LeagueAppend(GodName, taskForce, "joust", leagueCode(leagueJoustTier));
                            LeagueAppend(GodName, taskForce, "duel", leagueCode(leagueDuelTier));
                        });
                        $('#funcAPIGetLeague').text('OK');
                    }
                });

            });
        }
    });

    $.ajax({
        url: "Ajax/getPlayers.php",
        type: "POST",
        data: "matchid="+m+"&session="+s,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.mastery_Level;
                var Match = player.Match;
                var Queue = player.Queue;
                var SkinId = player.SkinId;
                var Tier = player.Tier;
                var playerCreated = player.playerCreated;
                var playerName = player.playerName;
                var ret_msg = player.ret_msg;
                var tierLosses = player.tierLosses;
                var tierWins = player.tierWins;
                var playerId = player.playerId;
                var godId = player.GodId;
                var taskForce = player.taskForce;

                playerId = parseInt(playerId);

                $.ajax({
                    url: "api/getKDA.php",
                    type: "POST",
                    data: "playerId=" + playerId + "&queue=" + Queue + "&s=" + s,
                    success: function (json2) {
                        var kda = JSON.parse(json2);
                        kda.forEach(function (akda) {
                            kdaAssists = akda.Assists;
                            kdaDeaths = akda.Deaths;
                            kdaKills = akda.Kills;
                            kdaLosses = akda.Losses;
                            kdaGold = akda.Gold;
                            kdaWins = akda.Wins;
                            kdagodName = akda.God;
                            kdagi = akda.GodId;
                            kdapi = akda.player_id;
                            kdaret_msg = akda.ret_msg;
                            kdalastPlayed = akda.LastPlayed;
                            kdamatches = akda.Matches;
                            kdaminutes = akda.Minutes;
                            kdaQueueName = akda.Queue;
                            kdanbMatch = kdaLosses + kdaWins;
                            kdaavgKills = Math.round(kdaKills / kdanbMatch, 2);
                            kdaavgDeaths = Math.round(kdaDeaths / kdanbMatch, 2);
                            kdaavgAssists = Math.round(kdaAssists / kdanbMatch, 2);
                            kdaPMI = Math.round((kdaavgKills + kdaavgAssists) / kdaavgDeaths, 2);

                            // HERE
                        });
                        $('#funcAPIGetKda').text('OK');
                    }
                });

                $.ajax({
                    url: "api/getLeague.php",
                    type: "POST",
                    data: "playerId=" + playerId + "&s=" + s,
                    success: function (json) {
                        var league = JSON.parse(json);
                        league.forEach(function (aleague) {
                            leagueAvatar_URL = aleague.Avatar_URL;
                            leagueCreated_Datetime = aleague.Created_Datetime;
                            leagueplayerId = aleague.Id;
                            leagueLast_Login_Datetime = aleague.Last_Login_Datetime;
                            leagueLeaves = aleague.Leaves;
                            leagueLevel = aleague.Level;
                            leagueLosses = aleague.Losses;
                            leagueMasteryLevel = aleague.MasteryLevel;
                            leagueName = aleague.Name;
                            leagueRank_Stat_Conquest = aleague.Rank_Stat_Conquest;
                            leagueRank_Stat_Duel = aleague.Rank_Stat_Duel;
                            leagueRank_Stat_Joust = aleague.Rank_Stat_Joust;
                            leagueRankedConquest = aleague.RankedConquest;
                            leagueConqLeaves = aleague.RankedConquest.Leaves;
                            leagueConqLosses = aleague.RankedConquest.Losses;
                            leagueConqName = aleague.RankedConquest.Name;
                            leagueConqPoints = aleague.RankedConquest.Points;
                            leagueConqPrevRank = aleague.RankedConquest.PrevRank;
                            leagueConqRank = aleague.RankedConquest.Rank;
                            leagueConqRank_Stat_Conq = aleague.RankedConquest.Rank_Stat_Conquest;
                            leagueConqRank_Stat_Duel = aleague.RankedConquest.Rank_Stat_Duel;
                            leagueConqRank_Stat_Joust = aleague.RankedConquest.Rank_Stat_Joust;
                            leagueConqSeason = aleague.RankedConquest.Season;
                            leagueConqTier = aleague.RankedConquest.Tier;
                            leagueConqTrend = aleague.RankedConquest.Trend;
                            leagueConqWins = aleague.RankedConquest.Wins;
                            leagueConqpi = aleague.RankedConquest.player_id;
                            leagueConqret_msg = aleague.RankedConquest.ret_msg;
                            leagueDuelLeaves = aleague.RankedDuel.Leaves;
                            leagueDuelLosses = aleague.RankedDuel.Losses;
                            leagueDuelName = aleague.RankedDuel.Name;
                            leagueDuelPoints = aleague.RankedDuel.Points;
                            leagueDuelPrevRank = aleague.RankedDuel.PrevRank;
                            leagueDuelRank = aleague.RankedDuel.Rank;
                            leagueDuelRank_Stat_Conq = aleague.RankedDuel.Rank_Stat_Conquest;
                            leagueDuelRank_Stat_Duel = aleague.RankedDuel.Rank_Stat_Duel;
                            leagueDuelRank_Stat_Joust = aleague.RankedDuel.Rank_Stat_Joust;
                            leagueDuelSeason = aleague.RankedDuel.Season;
                            leagueDuelTier = aleague.RankedDuel.Tier;
                            leagueDuelTrend = aleague.RankedDuel.Trend;
                            leagueDuelWins = aleague.RankedDuel.Wins;
                            leagueDuelpi = aleague.RankedDuel.player_id;
                            leagueDuelret_msg = aleague.RankedDuel.ret_msg;
                            leagueJoustLeaves = aleague.RankedJoust.Leaves;
                            leagueJoustLosses = aleague.RankedJoust.Losses;
                            leagueJoustName = aleague.RankedJoust.Name;
                            leagueJoustPoints = aleague.RankedJoust.Points;
                            leagueJoustPrevRank = aleague.RankedJoust.PrevRank;
                            leagueJoustRank = aleague.RankedJoust.Rank;
                            leagueJoustRank_Stat_Conq = aleague.RankedJoust.Rank_Stat_Conquest;
                            leagueJoustRank_Stat_Duel = aleague.RankedJoust.Rank_Stat_Duel;
                            leagueJoustRank_Stat_Joust = aleague.RankedJoust.Rank_Stat_Joust;
                            leagueJoustSeason = aleague.RankedJoust.Season;
                            leagueJoustTier = aleague.RankedJoust.Tier;
                            leagueJoustTrend = aleague.RankedJoust.Trend;
                            leagueJoustWins = aleague.RankedJoust.Wins;
                            leagueJoustpi = aleague.RankedJoust.player_id;
                            leagueJoustret_msg = aleague.RankedJoust.ret_msg;
                            // HERE
                        });
                        $('#funcAPIGetLeague').text('OK');
                    }
                });
            });
        }
    });
}