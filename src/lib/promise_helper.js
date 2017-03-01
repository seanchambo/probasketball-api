function wrapFetchPromise(cb, fulfill, reject) {
  var client = this;

  var callback = wrapCallback(cb);
  return function task(error, response, body) {
    if (error) {
      reject({
        error: error,
        response: response,
      });
    } else if (!/^2/.test('' + response.statusCode)) {
      // error = body;
      reject({
        error: body,
        response: response,
      });
    } else if (body == 'Invalid API key.') {
      reject({
        error: body,
        response: response
      });
    } else {
      fulfill(body);
    }

    callback.call(client, error, response, body);
  };
};

function wrapFindPromise(cb, fulfill, reject) {
  var client = this;

  var callback = wrapCallback(cb);
  return function task(error, response, body) {
    if (error) {
      reject({
        error: error,
        response: response,
      });
    } else if (!/^2/.test('' + response.statusCode)) {
      // error = body;
      reject({
        error: body,
        response: response,
      });
    } else if (body == 'Invalid API key.') {
      reject({
        error: body,
        response: response
      });
    } else {
      fulfill(body[0]);
    }

    callback.call(client, error, response, body[0]);
  };
};

function wrapCallback(cb) {
  var client = this;

  function callback() {
    // first hit the global callback, subsequently forward
    var args = Array.prototype.slice.call(arguments);
    if (cb !== undefined) {
      cb.apply(client, args);
    }
  }

  return callback;
};

module.exports.wrapFetchPromise = wrapFetchPromise;
module.exports.wrapFindPromise = wrapFindPromise;
module.exports.wrapCallback = wrapCallback;
