import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  contentTypeId: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  route: Ember.computed('contest', 'contentTypeId', function() {
    const contest_type = this.contest.get('contest_type')
    switch (contest_type) {
      case 'practice': return {
        name: 'practice.contest',
        model: [this.contentTypeId]
      }
      case 'competition_contest': return {
        name: 'competitions.id.contest',
        model: [this.contentTypeId, this.contest.get('id')]
      }
    }
  })
});
