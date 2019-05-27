import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  score: DS.attr(),
  time: DS.attr(),
  language: DS.attr(),
  plagiarism_detected: DS.attr(),
  user: DS.belongsTo('user'),
  contest: DS.belongsTo('contest'),
  problem: DS.belongsTo('problem'),
  college: DS.belongsTo('college')
});
