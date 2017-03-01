var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayersCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayersCollection, InheritedCollection);

module.exports = PlayersCollection;
