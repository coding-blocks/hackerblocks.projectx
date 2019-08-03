import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  logo: DS.attr(),
  contest: DS.belongsTo('contest'),
  tags: DS.hasMany('tag')
});
