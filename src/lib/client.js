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
  PlayerSportsVuCollection
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
    this.team_advanced_stats = new TeamAdvancedStatsCollection(this);
    this.player_advanced_stats = new PlayerAdvancedStatsCollection(this);
    this.team_box_scores = new TeamBoxScoresCollection(this);
    this.player_box_scores = new PlayerBoxScoresCollection(this);
    this.team_four_factors = new TeamFourFactorsCollection(this);
    this.player_four_factors = new PlayerFourFactorsCollection(this);
    this.team_misc_stats = new TeamMiscStatsCollection(this);
    this.player_misc_stats = new PlayerMiscStatsCollection(this);
    this.team_sports_vu = new TeamSportsVuCollection(this);
    this.player_sports_vu = new PlayerSportsVuCollection(this);
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
