module.exports = TeamCollection;

function TeamCollection(pb) {

  this.collection = [];
  this.pb = pb;
}

TeamCollection.prototype = {
  fetch: function() {
    this.pb.api(
      this.pb.POST,
      'team',
      {},
      fetchCallback
    )
  },
  fetchCallback: function(err, httpResponse, body) {
    if (err) {

    } else {
      this.collections = JSON.parse(body)
    }
  },
  get: function() {
    return this.collections;
  }
}
