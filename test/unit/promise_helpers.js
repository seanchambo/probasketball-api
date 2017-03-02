var expect = require('expect.js')
  , td = require('testdouble')
  , init = require('./utils/hooks').init
  , wrapFetchPromise = require('../../src/lib/promise_helpers').wrapFetchPromise
  , wrapFindPromise = require('../../src/lib/promise_helpers').wrapFindPromise
  , wrapCallback = require('../../src/lib/promise_helpers').wrapCallback;

describe('[UNIT] Promise Helpers', function() {

  beforeEach(function() {
    reject = td.function();
    fulfill = td.function();
    _callback = td.function();
  });

  afterEach(function() {
    td.reset();
  });

  describe('#wrapFetchPromise', function() {

    beforeEach(function() {
      promise = wrapFetchPromise(_callback, fulfill, reject);
    });

    it('(1)', function() {
      promise(null, { statusCode: 200 }, {});

      td.verify(fulfill({}));
    });

    it('(2)', function() {
      promise({ error: true }, true, null);

      td.verify(reject({ error: { error: true }, response: true }));
    });

    it('(3)', function() {
      promise(null, { statusCode: 500 }, 'error');

      td.verify(reject({ error: 'error', response: { statusCode: 500 } }));
    });

    it('(4)', function() {
      promise(null, { statusCode: 200 }, 'Invalid API key.');

      td.verify(reject({ error: 'Invalid API key.', response: { statusCode: 200 } }));
    });
  });

  describe('#wrapFindPromise', function() {

    beforeEach(function() {
      promise = wrapFindPromise(_callback, fulfill, reject);
    });

    it('(1)', function() {
      promise(null, { statusCode: 200 }, [{ id: 1}]);

      td.verify(fulfill({ id: 1 }));
    });

    it('(2)', function() {
      promise({ error: true }, true, [{}]);

      td.verify(reject({ error: { error: true }, response: true }));
    });

    it('(3)', function() {
      promise(null, { statusCode: 500 }, [{}]);

      td.verify(reject({ error: [{}], response: { statusCode: 500 } }));
    });

    it('(4)', function() {
      promise(null, { statusCode: 200 }, 'Invalid API key.');

      td.verify(reject({ error: 'Invalid API key.', response: { statusCode: 200 } }));
    });
  });
});
