var probasketballapi = require('../../src/probasketball')
  , expect = require('expect.js')
  , config = require('./utils/config')
  , init = require('./utils/hooks').init

var endpoints = [
  {
    name: 'Players',
    collection: ['players'],
    filter: { first_name: 'James', last_name: 'Harden' },
    find_property: 'player_name'
  }, {
    name: 'Teams',
    collection: ['teams'],
    filter: { team_name: 'Celtics' },
    find_property: 'city'
  }, {
    name: 'Games',
    collection: ['games'],
    filter: { date: '01/30/2017' },
    find_property: 'final'
  }, {
    name: 'Shot Charts',
    collection: ['shot_charts'],
    filter: { player_id: 201935 },
    find_property: 'shot_type'
  }, {
    name: 'Player usage',
    collection: ['players_usage'],
    filter: { player_id: 201935 },
    find_property: 'usg_pct'
  }, {
    name: 'Player Advanced Stats',
    collection: ['advanced_stats', 'players'],
    filter: { player_id: 201935 },
    find_property: 'off_rating'
  }, {
    name: 'Team Advanced Stats',
    collection: ['advanced_stats', 'teams'],
    filter: { team_id: 1610612745 },
    find_property: 'off_rating'
  }, {
    name: 'Player Misc Stats',
    collection: ['misc_stats', 'players'],
    filter: { player_id: 201935 },
    find_property: 'pts_off_tov'
  }, {
    name: 'Team Misc Stats',
    collection: ['misc_stats', 'teams'],
    filter: { team_id: 1610612745 },
    find_property: 'pts_off_tov'
  }, {
    name: 'Player SportsVu',
    collection: ['sports_vu', 'players'],
    filter: { player_id: 201935 },
    find_property: 'spd'
  }, {
    name: 'Team SportsVu',
    collection: ['sports_vu', 'teams'],
    filter: { team_id: 1610612745 },
    find_property: 'spd'
  }, {
    name: 'Player Four Factors',
    collection: ['four_factors', 'players'],
    filter: { player_id: 201935 },
    find_property: 'efg_pct'
  }, {
    name: 'Team Four Factors',
    collection: ['four_factors', 'teams'],
    filter: { team_id: 1610612745 },
    find_property: 'efg_pct'
  }, {
    name: 'Player Box Scores',
    collection: ['box_scores', 'players'],
    filter: { player_id: 201935 },
    find_property: 'fgm'
  }, {
    name: 'Team Box Scores',
    collection: ['box_scores', 'teams'],
    filter: { team_id: 1610612745 },
    find_property: 'fgm'
  }
];

describe('[INTEGRATION] Endpoints', function() {
  var probasketball = probasketballapi.connect(config.API_KEY, {});

  init.call(this);

  endpoints.forEach(function(endpoint, callback) {
    var collection = endpoint.collection.length < 2 ? probasketball[endpoint.collection[0]] : probasketball[endpoint.collection[0]][endpoint.collection[1]];

    describe(endpoint.name, function() {
      if (!collection.required_fields) {
        describe('#fetchAll', function() {
          it('(1) Should return all players in a callback', function(done) {
            collection.fetchAll(function(err, resp, body) {
              expect(body).to.be.an('array');
              expect(body).to.not.have.length(0);
              done();
            });
          });

          it('(2) Should return all players in a promise', function(done) {
            collection.fetchAll().then(function(body){
              expect(body).to.be.an('array');
              expect(body).to.not.have.length(0);
              done();
            });
          });
        });
      }

      describe('#fetch', function() {
        it('(1) Should return a filtered set of players in a callback', function(done) {
          collection.fetch(endpoint.filter, function(err, resp, body) {
            expect(body).to.be.an('array');
            expect(body).to.not.have.length(0);
            done();
          });
        });

        it('(2) Should return a filtered set of players in a promise', function(done) {
          collection.fetch(endpoint.filter).then(function(body){
            expect(body).to.be.an('array');
            expect(body).to.not.have.length(0);
            done();
          });
        });
      });

      describe('#find', function() {
        it('(1) Should return a single player in a callback', function(done) {
          collection.find(endpoint.filter, function(err, resp, body) {
            expect(body).to.be.an('object');
            expect(body).to.have.property(endpoint.find_property);
            done();
          });
        });

        it('(2) Should return a single player in a promise', function(done) {
          collection.find(endpoint.filter).then(function(body){
            expect(body).to.be.an('object');
            expect(body).to.have.property(endpoint.find_property);
            done();
          });
        });
      });
    });
  });
});
