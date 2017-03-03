var { inherits } = require('util');
var { InheritedCollection } = require('../helpers');

function ShotChartsCollection() {
  InheritedCollection.apply(this, arguments);
}
inherits(ShotChartsCollection, InheritedCollection);

module.exports = ShotChartsCollection;
