import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

const fib = (n, a = 1, b = 0) => (n === 0) ? b : fib(n - 1, a + b, a);

export default Model.extend({
  level: DS.attr('number'),
  perfectSubmissionCount: DS.attr('number'),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  nextLevel: Ember.computed('level', function() {
    return this.level + 1
  }),
  nextRequiredSubmissionCount: Ember.computed('perfectSubmissionCount', 'level', function() {
    return fib(this.level+2)
  }),
  createdAt: DS.attr()
});
