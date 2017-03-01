var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function GamesCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(GamesCollection, InheritedCollection);

module.exports = GamesCollection;
