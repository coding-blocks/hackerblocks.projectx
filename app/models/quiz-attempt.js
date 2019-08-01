import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  user: DS.attr(),
  contest: DS.attr(),
  quiz: DS.attr(),
  quiz_submissions: DS.hasMany('quiz-submission')
});
