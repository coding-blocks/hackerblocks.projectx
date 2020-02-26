import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  stars: DS.attr(),
  body: DS.attr(),
  contest: DS.belongsTo('contest'),
  content: DS.belongsTo('content'),
  user: DS.belongsTo('user')
});
