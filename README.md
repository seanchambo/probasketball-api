probasketball-api
===

An easy to use package that exposes the ProBasketball API (https://probasketballapi.com/)

### Installation

#### Install from NPM

```bash
npm install probasketball-api
```

### Usage

```javascript
var probasketball = require('probasketball-api')
var client = probasketball.connect('API_KEY', { version: 'v2' });
```

Client exposes different resources that allow you to call fetch and find on. Fetch returns a collection of resources, while find returns a single resource. If find finds many, then it will return the first one. If a resource does not have any required fields such as game_id, team_id or player_id, then the resource also allows a fetchAll which returns every instance of that collection. 

```javascript
client.players.fetchAll(function(err, resp, body) {
  // body will be an array of every player
});

client.advanced_stats.players.fetch({ player_id: 201935 })
.then(function(body) {
  // body will be an array of all the advanced stats for player with id 201935
})
.catch(function(err) {
  // this will catch any errs that are returned 
});
```

The list of resources are:
* players  
* teams  
* games  
* players_usage  
* shot_charts  
* advanced_stats.players  
* advanced_stats.teams  
* misc_stats.players  
* misc_stats.teams  
* box_scores.players  
* box_scores.teams  
* four_factors.players  
* four_factors.teams  
* sports_vu.players  
* sports_vu.teams  
