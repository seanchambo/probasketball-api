var config = require('./config')
  , rewire = require('rewire')
  , probasketball = rewire('../../../src/probasketball')
  , ProBasketballClient = require('./mocks').ProBasketballClient;

function init() {
    this.timeout(500);
}

function beforeEach() {
    this.client = probasketball.connect(config.API_KEY);
    this.client = new ProBasketballClient(config.API_KEY, {});
}

module.exports = {
    init: init,
    beforeEach : beforeEach
};
