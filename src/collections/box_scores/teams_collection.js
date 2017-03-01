var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamBoxScoresCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamBoxScoresCollection, InheritedCollection);

module.exports = TeamBoxScoresCollection;
