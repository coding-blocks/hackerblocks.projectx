import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  question_id: DS.attr(),
  answer_ids: DS.attr({ defaultValue: () => [] }),
  review_later: DS.attr(),
  contentAttempt: DS.belongsTo('content-attempt')
});
