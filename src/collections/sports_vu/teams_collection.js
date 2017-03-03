var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function TeamSportsVuCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(TeamSportsVuCollection, InheritedCollection);

module.exports = TeamSportsVuCollection;
