import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  metric: DS.attr(),
  icon: DS.attr(),
  contest: DS.belongsTo('contest', {inverse: null})
});
