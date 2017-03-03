var ProBasketballClient = require('./lib/client');

function connect(apiKey, options) {

  return new ProBasketballClient(apiKey, options);
}

module.exports.connect = connect;
module.exports.Client = ProBasketballClient;
