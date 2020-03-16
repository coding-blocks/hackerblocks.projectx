import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  contestTypeId: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  content: DS.belongsTo('content'),
  route: Ember.computed('contest', 'problem', 'contestTypeId', function() {
    const contest_type = this.contest.get('contest_type')
    switch (contest_type) {
      case 'practice': return {
        name: 'practice.contest.problem',
        model: [this.contestTypeId, this.content.get('id')]
      }
      case 'dcb': return {
        name: 'dcb.problem',
        model: [this.content.get('id')]
      }
      default: return {
        name: 'contests.contest.content',
        model: [this.contest.get('id'), this.content.get('id')]
      }
    }
  })
});
