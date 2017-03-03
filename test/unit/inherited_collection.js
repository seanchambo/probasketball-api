var expect = require('expect.js')
  , td = require('testdouble')
  , beforeEachFn = require('./utils/hooks').beforeEach
  , init = require('./utils/hooks').init
  , InheritedCollection = require('../../src/collections/helpers/inherited_collection');

describe('[UNIT] Inherited Collection', function() {
  var get, post, getOne, postOne, _callback;

  init.call(this);
  beforeEach(beforeEachFn);
  beforeEach(function() {
    inherited_collection = new InheritedCollection(this.client, 'endpoint');
    post = td.function();
    get = td.function();
    getOne = td.function();
    postOne = td.function();
    _callback = td.matchers.captor();
    td.replace(this.client, 'post', post);
    td.replace(this.client, 'get', get);
    td.replace(this.client, 'getOne', getOne);
    td.replace(this.client, 'postOne', postOne);
  });

  afterEach(function() {
    td.reset();
  });

  it('#intialize', function() {
    expect(inherited_collection.client).to.be(this.client);
    expect(inherited_collection.url).to.be('endpoint');
  });

  describe('#fetch', function() {
    it('(1)', function() {
      inherited_collection.fetch({ attr: 'attr' });

      td.verify(post({
        url: 'endpoint',
        body: { attr: 'attr' }
      }, _callback.capture()));
    });

    it('(2)', function() {
      var cb = function() {};
      inherited_collection.fetch({ attr: 'attr' }, cb);

      td.verify(post({
        url: 'endpoint',
        body: { attr: 'attr' }
      }, _callback.capture()));
    });
  });

  describe('#fetchAll', function() {
    var fetch;

    beforeEach(function() {
      fetch = td.function();
      td.replace(inherited_collection, 'fetch', fetch);
    });

    it('(1)', function() {
      inherited_collection.fetchAll();

      td.verify(fetch({}, undefined));
    });

    it('(2)', function() {
      var cb = function() {};
      inherited_collection.fetchAll(cb);

      td.verify(fetch({}, cb));
    });
  });

  describe('#find', function() {
    it('(1)', function() {
      inherited_collection.find({ attr: 'attr' });

      td.verify(postOne({
        url: 'endpoint',
        body: { attr: 'attr' }
      }, _callback.capture()));
    });

    it('(2)', function() {
      var cb = function() {};
      inherited_collection.find({ attr: 'attr' }, cb);

      td.verify(postOne({
        url: 'endpoint',
        body: { attr: 'attr' }
      }, _callback.capture()));
    });
  });

  describe('#_callback', function() {
    var call;

    beforeEach(function() {
      call = td.function();
      cb = function(err, response, body) {};
      td.replace(cb, 'call', call);
    });

    it('(1)', function() {
      inherited_collection._callback(cb, null, null, null);

      td.verify(call(inherited_collection, null, null, null));
    });

    it('(2)', function() {
      inherited_collection._callback(undefined, null, null, null);

      td.verify(call(undefined, null, null, null), {times: 0});
    });
  });
});
