import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  question_id: DS.attr(),
  answer_id: DS.attr(),
  currentattempt_id: DS.attr(),
  review_later: DS.attr(),
  quiz_attempt: DS.belongsTo('quiz-attempt')
});
