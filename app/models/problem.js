import Ember from 'ember'
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  difficulty: DS.attr(),
  mem_limit: DS.attr(),
  time_limit: DS.attr(),
  image: DS.attr(),
  source: DS.attr(),
  dcbProblems: DS.attr(),
  canSubmitReview: DS.attr(),
  successRate: DS.attr(),
  submissionCount: DS.attr(),
  contest: DS.belongsTo('contest'),
  solutionStubs: DS.hasMany('solution-stub'),
  tags: DS.hasMany('tags'),
  editorial: DS.belongsTo('editorial'),
  createdBy: DS.belongsTo('user'),
  topSubmission: DS.belongsTo('submission'),
  bookmark: DS.belongsTo('bookmarked-problem'),
  bookmarkedBy: DS.attr(),
  difficultyString: Ember.computed('difficulty', function() {
    switch (parseInt(this.difficulty)) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Difficult'
      default: return ''
    }
  })
});
