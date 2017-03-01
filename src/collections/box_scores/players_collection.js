var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayerBoxScoresCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayerBoxScoresCollection, InheritedCollection);

module.exports = PlayerBoxScoresCollection;
