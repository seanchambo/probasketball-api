module.exports = TeamResource;

function TeamResource(attrs) {
  this.team_name = attrs['team_name'];
  this.team_abbr = attrs['abbreviation'];
  this.city      = attrs['city'];
  this.id        = attrs['id'];
  this.dk_id     = attrs['dk_id'];
}
