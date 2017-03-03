var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamMiscStatsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamMiscStatsCollection, InheritedCollection);

module.exports = TeamMiscStatsCollection;
