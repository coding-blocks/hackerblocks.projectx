import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  problem: DS.belongsTo('problem'),
  contest: DS.belongsTo('contest')
});
