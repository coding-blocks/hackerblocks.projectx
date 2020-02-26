import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  score: DS.attr(),
  time: DS.attr(),
  language: DS.attr(),
  plagiarism_detected: DS.attr(),
  user: DS.belongsTo('user'),
  contest: DS.belongsTo('contest'),
  content: DS.belongsTo('content'),
  college: DS.belongsTo('college')
});
