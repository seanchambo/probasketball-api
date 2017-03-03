var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamAdvancedStatsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamAdvancedStatsCollection, InheritedCollection);

module.exports = TeamAdvancedStatsCollection;
