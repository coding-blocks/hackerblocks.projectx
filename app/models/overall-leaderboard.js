import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  month: DS.attr(),
  year: DS.attr(),
  score: DS.attr(),
  college: DS.belongsTo('college'),
  user: DS.belongsTo('user')
});
