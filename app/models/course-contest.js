import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  course: DS.belongsTo('course'),
  contest: DS.belongsTo('contest')
});
