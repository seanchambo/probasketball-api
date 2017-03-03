var config = require('./config')
  , rewire = require('rewire')
  , td = require('testdouble')
  , ProBasketballClient = rewire('../../../src/lib/client');

var request = td.function();

ProBasketballClient.__set__('request', request);

module.exports = {
    request: request,
    ProBasketballClient : ProBasketballClient,
};
