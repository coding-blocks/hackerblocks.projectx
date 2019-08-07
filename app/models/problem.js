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
  submissionCount: DS.attr(),
  contest: DS.belongsTo('contest'),
  solutionStubs: DS.hasMany('solution-stub'),
  editorial: DS.belongsTo('editorial'),
  createdBy: DS.belongsTo('user'),
  topSubmission: DS.belongsTo('submission'),
  bookmarks: DS.hasMany('bookmarked-problem'),
  difficultyString: Ember.computed('difficulty', function() {
    switch (parseInt(this.difficulty)) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Difficult'
      default: return ''
    }
  })
});
