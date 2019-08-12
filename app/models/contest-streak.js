import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  perfectSubmissionCount: DS.attr(),
  lastSubmissionAt: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user')
});
