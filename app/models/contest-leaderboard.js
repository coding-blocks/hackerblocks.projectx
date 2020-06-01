import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  score: DS.attr(),
  scoreAfterPlagiarismFiltering: DS.attr(),
  time: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  college: DS.belongsTo('college')
})