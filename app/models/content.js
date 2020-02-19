import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  type: DS.attr(),
  difficulty: DS.attr(),
  problem: DS.belongsTo('problem'),
  quiz: DS.belongsTo('quiz')
});
