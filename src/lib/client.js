var Promise = require('bluebird');
var request = require('request');

var {
  wrapFetchPromise,
  wrapFindPromise
} = require('./promise_helper');

var {
  TeamsCollection,
  GamesCollection,
  PlayersCollection,
  ShotChartsCollection,
  TeamAdvancedStatsCollection,
  PlayerAdvancedStatsCollection,
  TeamBoxScoresCollection,
  PlayerBoxScoresCollection,
  TeamFourFactorsCollection,
  PlayerFourFactorsCollection,
  TeamMiscStatsCollection,
  PlayerMiscStatsCollection,
  TeamSportsVuCollection,
  PlayerSportsVuCollection,
  PlayersUsageCollection
} = require('../collections');

var ProBasketballClient = function() {

  this.initialize.apply(this, arguments);
}

ProBasketballClient.prototype = {
  baseUrls: {
    'v1': 'https://probasketballapi.com/',
    'v2': 'http://api.probasketballapi.com/'
  },

  initialize: function(apiKey, options) {

    // Settings
    this.apiKey = apiKey;
    this.options = options || {};
    this.version = this.options.version || 'v2';
    this.baseUrl = this.baseUrls[this.version];

    // Collections
    this.teams = new TeamsCollection(this, 'team');
    this.games = new GamesCollection(this, 'game');
    this.players = new PlayersCollection(this, 'player');
    this.shot_charts = new ShotChartsCollection(this, 'shots');
    this.players_usage = new PlayersUsageCollection(this, 'usage/player');
    this.advanced_stats = {
      teams: new TeamAdvancedStatsCollection(this, 'advanced/team'),
      players: new PlayerAdvancedStatsCollection(this, 'advanced/player')
    };
    this.box_scores = {
      teams: new TeamBoxScoresCollection(this, 'boxscore/team'),
      players: new PlayerBoxScoresCollection(this, 'boxscore/player')
    };
    this.four_factors = {
      teams: new TeamFourFactorsCollection(this, 'four_factor/team'),
      players: new PlayerFourFactorsCollection(this, 'four_factor/player')
    };
    this.misc_stats = {
      teams: new TeamMiscStatsCollection(this, 'misc/team'),
      players: new PlayerMiscStatsCollection(this, 'misc/player')
    }
    this.sports_vu = {
      teams: new TeamSportsVuCollection(this, 'sportsvu/team'),
      players: new PlayerSportsVuCollection(this, 'sportsvu/player')
    }
  },

  get: function(kwargs, cb) {
    return new Promise(function(fulfill, reject) {
      kwargs = this.enrichKwargs(kwargs);
      kwargs.method = 'GET';

      var callback = wrapFetchPromise(cb, fulfill, reject);

      request(kwargs, callback);
    }.bind(this));
  },

  getOne: function(kwargs, cb) {
    return new Promise(function(fulfill, reject) {
      kwargs = this.enrichKwargs(kwargs);
      kwargs.method = 'GET';

      var callback = wrapFindPromise(cb, fulfill, reject);

      request(kwargs, callback);
    }.bind(this));
  },

  post: function(kwargs, cb) {
    return new Promise(function(fulfill, reject) {
      kwargs = this.enrichKwargs(kwargs);
      kwargs.method = 'POST';

      var callback = wrapFetchPromise(cb, fulfill, reject);

      request(kwargs, callback);
    }.bind(this));
  },

  postOne: function(kwargs, cb) {
    return new Promise(function(fulfill, reject) {
      kwargs = this.enrichKwargs(kwargs);
      kwargs.method = 'POST';

      var callback = wrapFindPromise(cb, fulfill, reject);

      request(kwargs, callback);
    }.bind(this));
  },

  enrichKwargs: function(kwargs) {
    kwargs['body']['api_key'] = this.apiKey;
    kwargs['url'] = this.enrichUrl(kwargs['url']);
    kwargs['json'] = true;
    return kwargs;
  },

  enrichUrl: function(url) {
    return this.baseUrl + url;
  }
}

module.exports = ProBasketballClient;
