import Ember from 'ember';
import moment from 'moment';
import { get } from '@ember/object'
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  solution: DS.attr(),
  submit_at: DS.attr(),
  msecs_elapsed: DS.attr(),
  language: DS.attr(),
  score: DS.attr('number'),
  result: DS.attr(),
  tc_runs: DS.attr(),
  judge_result: DS.attr(),
  explanation: DS.attr(),
  is_top_submission: DS.attr(),
  plagiarism_detected: DS.attr(),
  content: DS.belongsTo('content', { inverse: 'submissions' }),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  createdAt: DS.attr(),
  submissionType: DS.attr(),
  badge: DS.belongsTo('badge'),
  executionTime: Ember.computed('judge_result', function () {
    const testcases = get(this, 'judge_result.data.testcases')
    if (!testcases) 
      return '--'
    
    return testcases.reduce((acc, t) => acc + +t.runtime, 0).toFixed(2)
  }),
  submitAtHumanize: Ember.computed('createdAt', function() {
    return moment(this.createdAt).fromNow()
  }),
  resultParams: Ember.computed('explanation', 'submissionType', function() {
    if (this.submissionType === 'web') {
      return {
        color: 'green',
        icon: 'fas fa-check',
        message: 'Submitted'
      }
    } else {
      switch(this.explanation) {
        case 'Perfect': return {
          color: 'green',
          icon: 'fas fa-check',
          message: 'Accepted'
        }
        case 'WrongAnswer':
        case 'FailedTestcase': return {
          color: 'red',
          icon: 'fas fa-times',
          message: 'Wrong Answer'
        }
        case 'TimeLimitExceeded': return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'TLE'
        }
        case 'CompilationError': return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'Compilation Error'
        }
        case 'ContestOver': return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'Contest Over'
        }
        case 'TestcaseUnlocked': return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'Test Case Unlocked'
        }
        case 'EditorialUnlocked': return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'Editorial Unlocked'
        }
        default: return {
          color: 'orange',
          icon: 'fas fa-exclamation',
          message: 'Submission Not Judged'
        }
      }
    }
  })
});
