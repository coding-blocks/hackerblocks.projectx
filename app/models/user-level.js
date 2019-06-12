import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  level: DS.attr(),
  perfectSubmissionCount: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user')
});
