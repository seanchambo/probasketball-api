function InheritedCollection() {
  this.initialize.apply(this, arguments);
}

InheritedCollection.prototype = {
  initialize: function(client, url, required_fields) {
    this.client = client;
    this.url = url;
    this.required_fields = required_fields;

    if (!this.required_fields) {
      this.fetchAll = function(cb) {
        return this.fetch({}, cb);
      }
    }
  },

  fetch: function(options, cb) {
    var me = this;

    return this.client.post({
      url: me.url,
      body: options
    }, this._callback.bind(this, cb));
  },

  find: function(options, cb) {
    var me = this;

    return this.client.postOne({
      url: me.url,
      body: options
    }, this._callback.bind(this, cb));
  },

  _callback: function(cb, err, response, body) {
    if (cb !== undefined)
      cb.call(this, err, response, body);
  },
}

module.exports = InheritedCollection;
