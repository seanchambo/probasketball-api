var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayerFourFactorsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayerFourFactorsCollection, InheritedCollection);

module.exports = PlayerFourFactorsCollection;
