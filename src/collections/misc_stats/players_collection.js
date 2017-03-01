var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayerMiscStatsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayerMiscStatsCollection, InheritedCollection);

module.exports = PlayerMiscStatsCollection;
