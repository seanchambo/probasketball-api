var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamFourFactorsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamFourFactorsCollection, InheritedCollection);

module.exports = TeamFourFactorsCollection;
