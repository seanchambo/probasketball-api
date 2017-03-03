var Promise = require('bluebird');
var request = require('request');

var {
  wrapFetchPromise,
  wrapFindPromise
} = require('./promise_helpers');

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
    this.teams = new TeamsCollection(this, 'team', false);
    this.games = new GamesCollection(this, 'game', false);
    this.players = new PlayersCollection(this, 'player', false);
    this.shot_charts = new ShotChartsCollection(this, 'shots', true);
    this.players_usage = new PlayersUsageCollection(this, 'usage/player', true);
    this.advanced_stats = {
      teams: new TeamAdvancedStatsCollection(this, 'advanced/team', true),
      players: new PlayerAdvancedStatsCollection(this, 'advanced/player', true)
    };
    this.box_scores = {
      teams: new TeamBoxScoresCollection(this, 'boxscore/team', true),
      players: new PlayerBoxScoresCollection(this, 'boxscore/player', true)
    };
    this.four_factors = {
      teams: new TeamFourFactorsCollection(this, 'four_factor/team', true),
      players: new PlayerFourFactorsCollection(this, 'four_factor/player', true)
    };
    this.misc_stats = {
      teams: new TeamMiscStatsCollection(this, 'misc/team', true),
      players: new PlayerMiscStatsCollection(this, 'misc/player', true)
    }
    this.sports_vu = {
      teams: new TeamSportsVuCollection(this, 'sportsvu/team', true),
      players: new PlayerSportsVuCollection(this, 'sportsvu/player', true)
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
    var me = this;

    return new Promise(function(fulfill, reject) {
      kwargs = this.enrichKwargs(kwargs);
      kwargs.method = 'POST';

      var callback = wrapFetchPromise(cb, fulfill, reject);

      request(kwargs, callback);
    }.bind(this));
  },

  postOne: function(kwargs, cb) {
    var me = this;
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
