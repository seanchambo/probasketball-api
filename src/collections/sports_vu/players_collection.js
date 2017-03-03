var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function PlayerSportsVuCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(PlayerSportsVuCollection, InheritedCollection);

module.exports = PlayerSportsVuCollection;
