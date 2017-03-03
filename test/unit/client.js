var expect = require('expect.js')
  , td = require('testdouble')
  , init = require('./utils/hooks').init
  , ProBasketballClient = require('./utils/mocks').ProBasketballClient
  , request = require('./utils/mocks').request
  , config = require('./utils/config');

describe('[UNIT] ProBasketballClient', function() {
  var probasketball, _callback;

  init.call(this);
  beforeEach(function() {
    probasketball = new ProBasketballClient(config.API_KEY, { version: 'v2' });
    _callback = td.matchers.captor();
  });

  afterEach(function() {
    td.reset();
  });

  it('#intialize', function() {
    expect(probasketball.apiKey).to.be(config.API_KEY);
    expect(probasketball.options.version).to.be('v2');
    expect(probasketball.version).to.be('v2');
    expect(probasketball.baseUrl).to.be('http://api.probasketballapi.com/');
  });

  describe('#get', function() {
    it('(1)', function() {
      probasketball.get({
        url: 'endpoint',
        body: {}
      });

      td.verify(request({
        url: 'http://api.probasketballapi.com/endpoint',
        method: 'GET',
        body: {
          api_key: config.API_KEY
        },
        json: true
      }, _callback.capture()));
    });
  });

  describe('#getOne', function() {
    it('(1)', function() {
      probasketball.getOne({
        url: 'endpoint',
        body: {}
      });

      td.verify(request({
        url: 'http://api.probasketballapi.com/endpoint',
        method: 'GET',
        body: {
          api_key: config.API_KEY
        },
        json: true
      }, _callback.capture()));
    });
  });

  describe('#post', function() {
    it('(1)', function() {
      probasketball.post({
        url: 'endpoint',
        body: {}
      });

      td.verify(request({
        url: 'http://api.probasketballapi.com/endpoint',
        method: 'POST',
        body: {
          api_key: config.API_KEY
        },
        json: true
      }, _callback.capture()));
    });
  });

  describe('#postOne', function() {
    it('(1)', function() {
      probasketball.postOne({
        url: 'endpoint',
        body: {}
      });

      td.verify(request({
        url: 'http://api.probasketballapi.com/endpoint',
        method: 'POST',
        body: {
          api_key: config.API_KEY
        },
        json: true
      }, _callback.capture()));
    });
  });
});
