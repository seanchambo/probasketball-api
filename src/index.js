/* global module, require */

'use strict';

module.exports = ProBasketball;

var request = require('request');
// var {
//   TeamResource,
//   PlayerResource,
//   GameResource,
//   ShotChartResource,
//   AdvancedTeamStatsResource,
//   AdvancedPlayerStatsResource,
//   TeamBoxScoreResource,
//   PlayerBoxScoreResource,
//   TeamFourFactorsResource,
//   PlayerFourFactorsResource,
//   TeamMiscStatsResource,
//   PlayerMiscStatsResource,
//   TeamSportsVuResource,
//   PlayerSportsVuResource,
//   PlayerUsageResource
// } = require('./resources');
// var {
//   TeamsCollection,
//   PlayersCollection,
//   GamesCollection,
//   ShotChartsCollection,
//   AdvancedTeamsStatsCollection,
//   AdvancedPlayersStatsCollection,
//   TeamsBoxScoreCollection,
//   PlayersBoxScoreCollection,
//   TeamsFourFactorsCollection,
//   PlayersFourFactorsCollection,
//   TeamsMiscStatsCollection,
//   PlayersMiscStatsCollection,
//   TeamsSportsVuCollection,
//   PlayersSportsVuCollection,
//   PlayersUsageCollection
// } = require('./collections');

function ProBasketball(apiKey, options) {
  this.POST = 'POST';

  this.baseUrls = {
    'v1': 'https://probasketballapi.com/',
    'v2': 'http://api.probasketballapi.com/'
  }

  // // Basic Resources
  // this.team = new TeamResource(this);
  // this.teams = new TeamsCollection(this);
  // this.player = new PlayerResource(this);
  // this.players = new PlayersCollection(this);
  // this.game = new GameResource(this);
  // this.games = new GamesCollection(this);
  // this.shotchart = new ShotChartResource(this);
  // this.shotcharts = new ShotChartsCollection(this);
  //
  // // Advanced stats
  // this.advanced_team_stats = new AdvancedTeamStatsResource(this);
  // this.advanced_teams_stats = new AdvancedTeamsStatsCollection(this);
  // this.advanced_player_stats = new AdvancedPlayerStatsResource(this);
  // this.advanced_players_stats = new AdvancedPlayersStatsCollection(this);
  //
  // // Box Score
  // this.team_box_score = new TeamBoxScoreResource(this);
  // this.teams_box_score = new TeamsBoxScoreCollection(this);
  // this.player_box_score = new PlayerBoxScoreResource(this);
  // this.players_box_score = new PlayersBoxScoreCollection(this);
  //
  // // Four Factors
  // this.team_four_factors = new TeamFourFactorsResource(this);
  // this.teams_four_factors = new TeamsFourFactorsCollection(this);
  // this.player_four_factors = new PlayerFourFactorsResource(this);
  // this.players_four_factors = new PlayersFourFactorsCollection(this);
  //
  // // Misc Stats
  // this.team_misc_stats = new TeamMiscStatsResource(this);
  // this.teams_misc_stats = new TeamsMiscStatsCollection(this);
  // this.player_misc_stats = new PlayerMiscStatsResource(this);
  // this.players_misc_stats = new PlayersMiscStatsCollection(this);
  //
  // // SportsVu
  // this.team_sports_vu = new TeamSportsVuResource(this);
  // this.teams_sports_vu = new TeamsSportsVuCollection(this);
  // this.player_sports_vu = new PlayerSportsVuResource(this);
  // this.players_sports_vu = new PlayersSportsVuCollection(this);
  //
  // // Player Usage
  // this.player_usage = new PlayerUsageResource(this);
  // this.players_usage = new PlayersUsageCollection(this);

  // Settings
  this.apiKey = apiKey;
  this.version = options.version || 'v2';
  this.baseUrl = this.baseUrls[this.version];
}

ProBasketball.prototype = {
  api: function(method, url, postData, cb) {
    var options = {
      url: enrichUrl(url),
      method: method,
      json: true,
      formData: enrichPostData(postData)
    };

    request(options, callback);
  },
  enrichPostData: function(postData) {
    postData['api_key'] = this.apiKey;

    return postData;
  },
  enrichUrl: function(url) {

    return this.baseUrl + url;
  }
};
