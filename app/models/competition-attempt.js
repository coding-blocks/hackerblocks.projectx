import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  user: DS.belongsTo('user'),
  competition: DS.belongsTo('competition')
});
