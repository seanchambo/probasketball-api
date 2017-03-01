function TeamsCollection() {
  this.initialize.apply(this, arguments);
}

TeamsCollection.prototype = {
  initialize: function(client) {
    this.client = client;
  },

  fetchAll: function(cb) {
    return this.fetch({}, cb);
  },

  fetch: function(options, cb) {
    return this.client.post({
      url: 'team',
      body: options
    }, this._fetchCallback.bind(this, cb));
  },

  findBy: function(options, cb) {
    return this.client.postOne({
      url: 'team',
      body: options
    }, this._findCallback.bind(this, cb));
  },

  find: function(id, cb) {
    return this.findBy({ id: id }, cb);
  },

  _fetchCallback: function(cb, err, response, body) {
    if (cb !== undefined)
      cb.call(this, err, response, body);
  },

  _findCallback: function(cb, err, response, body) {
    if (cb !== undefined)
      cb.call(this, err, response, body);
  }
}

module.exports = TeamsCollection;
