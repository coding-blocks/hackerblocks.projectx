import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  title: DS.attr(),
  quiz_id: DS.attr(),
  description: DS.attr(),
  image: DS.attr(),
  duration: DS.attr(),
  maxAttempts: DS.attr(),
  startDate: DS.attr(),
  endDate: DS.attr(),
  contest: DS.belongsTo('contest'),
  questions: DS.hasMany('question')
});
