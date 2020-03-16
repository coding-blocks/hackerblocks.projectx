import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  content: DS.belongsTo('content'),
  contestAttempt: DS.belongsTo('contest-attempt'),
  quizQuestionSubmissions: DS.hasMany('quiz-question-submission')
});
