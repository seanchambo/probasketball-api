function InheritedCollection() {
  this.initialize.apply(this, arguments);
}

InheritedCollection.prototype = {
  initialize: function(client, url) {
    this.client = client;
    this.url = url;
  },

  fetchAll: function(cb) {
    return this.fetch({}, cb);
  },

  fetch: function(options, cb) {
    var me = this;

    return this.client.post({
      url: me.url,
      body: options
    }, this._callback.bind(this, cb));
  },

  findBy: function(options, cb) {
    var me = this;

    return this.client.postOne({
      url: me.url,
      body: options
    }, this._callback.bind(this, cb));
  },

  find: function(id, cb) {
    return this.findBy({ id: id }, cb);
  },

  _callback: function(cb, err, response, body) {
    if (cb !== undefined)
      cb.call(this, err, response, body);
  },
}

module.exports = InheritedCollection;
