import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  contest: DS.belongsTo('contest'),
  problem: DS.belongsTo('problem')
});
