import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  contentTypeId: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  problem: DS.belongsTo('problem'),
  route: Ember.computed('contest', 'problem', 'contentTypeId', function() {
    const contest_type = this.contest.get('contest_type')
    switch (contest_type) {
      case 'practice': return {
        name: 'practice.contest.problem',
        model: [this.contentTypeId, this.problem.get('id')]
      }
      case 'competition_contest': return {
        name: 'competitions.id.contest.attempt.problem',
        model: [this.contentTypeId, this.contest.get('id'), this.problem.get('id')]
      }
      case 'dcb': return {
        name: 'dcb.problem',
        model: [this.problem.get('id')]
      }
      case 'college_contest': return {
        name: 'contests.college.contest.attempt.problem',
        model: [this.contentTypeId, this.problem.get('id')]
      }
      case 'course_contest': return {
        name: 'contests.course.contest.problem',
        model: [this.contentTypeId, this.problem.get('id')]
      }
    }
  })
});
