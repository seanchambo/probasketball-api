var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayerAdvancedStatsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayerAdvancedStatsCollection, InheritedCollection);

module.exports = PlayerAdvancedStatsCollection;
