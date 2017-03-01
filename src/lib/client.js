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
    this.teams = new TeamsCollection(this);
    this.games = new GamesCollection(this);
    this.players = new PlayersCollection(this);
    this.shot_charts = new ShotChartsCollection(this);
    this.players_usage = new PlayersUsageCollection(this);
    this.advanced_stats = {
      teams: new TeamAdvancedStatsCollection(this),
      players: new PlayerAdvancedStatsCollection(this)
    };
    this.box_scores = {
      teams: new TeamBoxScoresCollection(this),
      players: new PlayerBoxScoresCollection(this)
    };
    this.four_factors = {
      teams: new TeamFourFactorsCollection(this),
      players: new PlayerFourFactorsCollection(this)
    };
    this.misc_stats = {
      teams: new TeamMiscStatsCollection(this),
      players: new PlayerMiscStatsCollection(this)
    }
    this.sports_vu = {
      teams: new TeamSportsVuCollection(this),
      players: new PlayerSportsVuCollection(this)
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
