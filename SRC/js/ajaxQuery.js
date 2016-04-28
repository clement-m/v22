function getConnection() {
    $.ajax({
        url: "Ajax/connection.php",
        type: "POST",
        data: "",
        success: function(r) {
            var r = JSON.parse(r);
            var response = r.ret_msg;
            var session = r.session_id;
            var timestamp = r.timestamp;
            if(response == "Approved") getStatus($('input[name="player"]').val(),session);
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
            $('#match').empty();
            if(statusId == 3) {
                $.when(createMatch(matchId)).then(function(){
                    showMatch(matchId,s);
                });
            }
        }
    });
}

function showMatch(m,s) {
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
                $.when(
                    $.ajax({
                        url: "Ajax/showPlayer.php",
                        type: "POST",
                        data: "taskForce="+taskForce+"&GodName="+GodName,
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
                    }),
                    $.ajax({
                        url: "Ajax/showRank.php",
                        type: "POST",
                        data: "playerId="+playerId+"&godId="+godId+"&m="+m+"&s="+s,
                        success: function(html) {
                            $('#' + taskForce + GodName + ' .rank .loading').remove();
                            if($('#' + taskForce + GodName+' .rank').text() == "") {
                                $('#' + taskForce + GodName + ' .rank').append(html);
                            } else {
                                $('#' + taskForce + GodName + ' .rank').append("tamer");
                            }
                        }
                    }),
                    $.ajax({
                        url: "Ajax/showGodScore.php",
                        type: "POST",
                        data: "playerId="+playerId+"&godId="+godId+"&m="+m+"&s="+s,
                        success: function (html) {
                            $('#' + taskForce + GodName + ' .kda .loading').remove();
                            if($('#' + taskForce + GodName+' .kda').text() == "") {
                                $('#' + taskForce + GodName + ' .kda').append(html);
                            } else {
                                $('#' + taskForce + GodName + ' .kda').append("tamer");
                            }
                        }
                    }),
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
                    })
                ).then(function() {
                    $.ajax({
                        url: "API/getRank.php",
                        type: "POST",
                        data: "playerId=" + playerId + "&s=" + s,
                        success: function (json2) {
                            var rank = JSON.parse(json2);
                            rank.forEach(function (arank) {
                                var Assists = arank.Assists;
                                var Deaths = arank.Deaths;
                                var Kills = arank.Kills;
                                var Losses = arank.Losses;
                                var MinionKills = arank.MinionKills;
                                var Rank = arank.Rank; // toshow
                                var Wins = arank.Wins;
                                var Worshippers = arank.Worshippers; // toshow
                                var godName = arank.god;
                                var gi = parseInt(arank.god_id);
                                var pi = arank.player_id;
                                var ret_msg = arank.ret_msg;
                                if (gi == godId) {
                                    $('#'+ taskForce  + GodName + ' .rank').empty();
                                    $('#'+ taskForce  + GodName + ' .rank').append('<img src="src/IMG/masteryLvl/m' + Rank + '.jpg" alt="mastery Level" />');
                                }
                            });
                        }
                    }),
                    $.ajax({
                        url: "api/getKDA.php",
                        type: "POST",
                        data: "playerId=" + playerId + "&queue=" + Queue + "&s=" + s,
                        success: function (json2) {
                            var kda = JSON.parse(json2);
                            kda.forEach(function (akda) {
                                var Assists = akda.Assists;
                                var Deaths = akda.Deaths;
                                var Kills = akda.Kills;
                                var Losses = akda.Losses;
                                var Gold = akda.Gold;
                                var Wins = akda.Wins;
                                var godName = akda.God;
                                var gi = akda.GodId;
                                var pi = akda.player_id;
                                var ret_msg = akda.ret_msg;
                                var lastPlayed = akda.LastPlayed;
                                var matches = akda.Matches;
                                var minutes = akda.Minutes;
                                var QueueName = akda.Queue;
                                var nbMatch = Losses + Wins;

                                var avgKills = Math.round(Kills / nbMatch, 2);
                                var avgDeaths = Math.round(Deaths / nbMatch, 2);
                                var avgAssists = Math.round(Assists / nbMatch, 2);
                                var PMI = Math.round((avgKills + avgAssists) / avgDeaths, 2);

                                if (gi == godId) {
                                    $('#'+ taskForce  + GodName + ' .kda').empty();
                                    $('#'+ taskForce  + GodName + ' .kda').append(avgKills + "/" + avgDeaths + "/" + avgAssists + " pmi:" + PMI);
                                }
                            });
                        }
                    }),
                    $.ajax({
                        url: "api/getLeague.php",
                        type: "POST",
                        data: "playerId=" + playerId + "&s=" + s,
                        success: function (json) {
                            var league = JSON.parse(json);
                            league.forEach(function (aleague) {
                                var Avatar_URL = aleague.Avatar_URL;
                                var Created_Datetime = aleague.Created_Datetime;
                                var playerId = aleague.Id;
                                var Last_Login_Datetime = aleague.Last_Login_Datetime;
                                var Leaves = aleague.Leaves;
                                var Level = aleague.Level;
                                var Losses = aleague.Losses;
                                var MasteryLevel = aleague.MasteryLevel;
                                var Name = aleague.Name;
                                var Rank_Stat_Conquest = aleague.Rank_Stat_Conquest;
                                var Rank_Stat_Duel = aleague.Rank_Stat_Duel;
                                var Rank_Stat_Joust = aleague.Rank_Stat_Joust;
                                var RankedConquest = aleague.RankedConquest;
                                var ConqLeaves = aleague.RankedConquest.Leaves;
                                var ConqLosses = aleague.RankedConquest.Losses;
                                var ConqName = aleague.RankedConquest.Name;
                                var ConqPoints = aleague.RankedConquest.Points;
                                var ConqPrevRank = aleague.RankedConquest.PrevRank;
                                var ConqRank = aleague.RankedConquest.Rank;
                                var ConqRank_Stat_Conq = aleague.RankedConquest.Rank_Stat_Conquest;
                                var ConqRank_Stat_Duel = aleague.RankedConquest.Rank_Stat_Duel;
                                var ConqRank_Stat_Joust = aleague.RankedConquest.Rank_Stat_Joust;
                                var ConqSeason = aleague.RankedConquest.Season;
                                var ConqTier = aleague.RankedConquest.Tier;
                                var ConqTrend = aleague.RankedConquest.Trend;
                                var ConqWins = aleague.RankedConquest.Wins;
                                var Conqpi = aleague.RankedConquest.player_id;
                                var Conqret_msg = aleague.RankedConquest.ret_msg;
                                var DuelLeaves = aleague.RankedDuel.Leaves;
                                var DuelLosses = aleague.RankedDuel.Losses;
                                var DuelName = aleague.RankedDuel.Name;
                                var DuelPoints = aleague.RankedDuel.Points;
                                var DuelPrevRank = aleague.RankedDuel.PrevRank;
                                var DuelRank = aleague.RankedDuel.Rank;
                                var DuelRank_Stat_Conq = aleague.RankedDuel.Rank_Stat_Conquest;
                                var DuelRank_Stat_Duel = aleague.RankedDuel.Rank_Stat_Duel;
                                var DuelRank_Stat_Joust = aleague.RankedDuel.Rank_Stat_Joust;
                                var DuelSeason = aleague.RankedDuel.Season;
                                var DuelTier = aleague.RankedDuel.Tier;
                                var DuelTrend = aleague.RankedDuel.Trend;
                                var DuelWins = aleague.RankedDuel.Wins;
                                var Duelpi = aleague.RankedDuel.player_id;
                                var Duelret_msg = aleague.RankedDuel.ret_msg;
                                var JoustLeaves = aleague.RankedJoust.Leaves;
                                var JoustLosses = aleague.RankedJoust.Losses;
                                var JoustName = aleague.RankedJoust.Name;
                                var JoustPoints = aleague.RankedJoust.Points;
                                var JoustPrevRank = aleague.RankedJoust.PrevRank;
                                var JoustRank = aleague.RankedJoust.Rank;
                                var JoustRank_Stat_Conq = aleague.RankedJoust.Rank_Stat_Conquest;
                                var JoustRank_Stat_Duel = aleague.RankedJoust.Rank_Stat_Duel;
                                var JoustRank_Stat_Joust = aleague.RankedJoust.Rank_Stat_Joust;
                                var JoustSeason = aleague.RankedJoust.Season;
                                var JoustTier = aleague.RankedJoust.Tier;
                                var JoustTrend = aleague.RankedJoust.Trend;
                                var JoustWins = aleague.RankedJoust.Wins;
                                var Joustpi = aleague.RankedJoust.player_id;
                                var Joustret_msg = aleague.RankedJoust.ret_msg;
                                LeagueAppend(GodName, taskForce, "conquest", leagueCode(ConqTier));
                                LeagueAppend(GodName, taskForce, "joust", leagueCode(JoustTier));
                                LeagueAppend(GodName, taskForce, "duel", leagueCode(DuelTier));
                            });
                        }
                    })
                });
            });
        }
    });
}

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