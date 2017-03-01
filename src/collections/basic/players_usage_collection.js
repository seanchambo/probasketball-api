var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayersUsageCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayersUsageCollection, InheritedCollection);

module.exports = PlayersUsageCollection;
