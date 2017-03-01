var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamsCollection, InheritedCollection);

module.exports = TeamsCollection;
