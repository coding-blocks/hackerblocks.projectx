import DS from 'ember-data';
import Moment from 'moment';
const { Model } = DS;

export default Model.extend({
  contest: DS.belongsTo('contest'),
  problems: DS.hasMany('problem'),
  top_problem: Ember.computed('problems', function() {
    const problems = this.get('problems')
    return problems.find(problem => problem.dcbProblems && Moment(problem.dcbProblems.start) > Moment().subtract(1, 'day'))
  })
});
