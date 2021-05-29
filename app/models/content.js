import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  type: DS.attr(),
  difficulty: DS.attr(),
  stats: DS.attr(),
  dcbContents: DS.attr(),
  problem: DS.belongsTo('problem'),
  quiz: DS.belongsTo('quiz'),
  project: DS.belongsTo('project'),
  contest: DS.hasMany('contest'),
  submissions:DS.hasMany('submission'),
  bookmarkedContent: DS.belongsTo('bookmarked-content'),
  topSubmission: DS.belongsTo('submission'),
  progress: DS.belongsTo('progress'),
  difficultyString: Ember.computed('difficulty', function() {
    switch (parseInt(this.difficulty)) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Hard'
      default: return 'Medium'
    }
  })
});
