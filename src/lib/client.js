var Promise = require('bluebird');
var request = require('request');

var {
  wrapFetchPromise,
  wrapFindPromise
} = require('./promise_helper');

var {
  TeamsCollection
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
    this.apiKey = apiKey;
    this.options = options || {};
    this.version = this.options.version || 'v2';
    this.baseUrl = this.baseUrls[this.version];
    this.teams = new TeamsCollection(this);
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
