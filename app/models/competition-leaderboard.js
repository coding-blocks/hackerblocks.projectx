import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  score: DS.attr(),
  time: DS.attr(),
  competition: DS.belongsTo('competition'),
  user: DS.belongsTo('user'),
  college: DS.belongsTo('college')
})