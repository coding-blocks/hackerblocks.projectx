import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  language: DS.attr(),
  body: DS.attr(),
  problem: DS.belongsTo('problem')
});
