function getPlayers(m,s) {
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
                $.when(showMatch(taskForce,GodName,playerId,playerName,godId,m,s)).then(function() {
                    if($('#'+GodName+' .rank').text() == "RANK NOT UPDATED") {
                        $.ajax({
                            url: "API/getRank.php",
                            type: "POST",
                            data: "playerId="+playerId+"&s="+s,
                            success: function(json2) {
                                var rank = JSON.parse(json2);
                                rank.forEach(function(arank){
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
                                    if(gi == godId) {
                                        $('#'+GodName+' .rank').empty();
                                        $('#'+GodName+' .rank').append('<img src="src/IMG/masteryLvl/m'+Rank+'.jpg" alt="mastery Level" />');
                                    }
                                });
                            }
                        })
                    }

                    if($('#'+GodName+' .kda').text() == "KDA NOT UPDATED") {
                        $.ajax({
                            url: "api/getKDA.php",
                            type: "POST",
                            data: "playerId="+playerId+"&queue="+Queue+"&s="+s,
                            success: function(json2) {
                                var kda = JSON.parse(json2);
                                kda.forEach(function(akda){
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
                                    if(gi == godId) {
                                        $('#'+GodName+' .kda').empty();
                                        $('#'+GodName+' .kda').append(Kills + "/"+Deaths+"/"+Assists);
                                    }
                                });
                            }
                        })
                    }

                    if($('#'+GodName+' .conquest').text() == "LEAGUE NOT UPDATED") {
                        $.ajax({
                            url: "api/getLeague.php",
                            type: "POST",
                            data: "playerId="+playerId+"&s="+s,
                            success: function(json) {
                                var league = JSON.parse(json);
                                league.forEach(function(aleague){
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
                                    var Lconq = leagueCode(ConqTier);
                                    var Ljoust = leagueCode(JoustTier);
                                    var Lduel = leagueCode(DuelTier);
                                    $('#'+GodName+' .conquest').empty();
                                    if(Lconq.name == "unranked") $('#'+GodName+' .conquest').append(Lconq.name);
                                    else {
                                        $('#'+GodName+' .conquest').append(Lconq.name);
                                        $('#'+GodName+' .conquest').append('<img src="src/IMG/masteryLvl/m'+Lconq.num+'.jpg" alt="mastery Level" />');
                                    }
                                    $('#'+GodName+' .joust').empty();
                                    if(Ljoust.name == "unranked") $('#'+GodName+' .joust').append(Ljoust.name);
                                    else {
                                        $('#'+GodName+' .joust').append(Ljoust.name);
                                        $('#'+GodName+' .joust').append('<img src="src/IMG/masteryLvl/m'+Ljoust.num+'.jpg" alt="mastery Level" />');
                                    }
                                    $('#'+GodName+' .duel').empty();
                                    if(Lduel.name == "unranked") $('#'+GodName+' .duel').append(Lduel.name);
                                    else {
                                        $('#'+GodName+' .duel').append(Lduel.name);
                                        $('#'+GodName+' .duel').append('<img src="src/IMG/masteryLvl/m'+Lduel.num+'.jpg" alt="mastery Level" />');
                                    }
                                });
                            }
                        })
                    }
                });
            });
        }
    });
}