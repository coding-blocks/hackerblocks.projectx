import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  type: DS.attr(),
  difficulty: DS.attr(),
  problem: DS.belongsTo('problem'),
  quiz: DS.belongsTo('quiz'),
  contest: DS.hasMany('contest'),
  difficultyString: Ember.computed('difficulty', function() {
    switch (parseInt(this.difficulty)) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Hard'
      default: return 'Medium'
    }
  })
});
