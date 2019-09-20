import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  input: DS.attr(),
  expected_output: DS.attr(),
  problem: DS.belongsTo('problem')
});
