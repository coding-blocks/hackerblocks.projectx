import Ember from 'ember';
import moment from 'moment';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  source: DS.attr(),
  submit_at: DS.attr(),
  msecs_elapsed: DS.attr(),
  language: DS.attr(),
  score: DS.attr(),
  result: DS.attr(),
  tc_runs: DS.attr(),
  judge_result: DS.attr(),
  explanation: DS.attr(),
  is_top_submission: DS.attr(),
  plagiarism_detected: DS.attr(),
  problem: DS.attr(),
  contest: DS.attr(),
  user: DS.attr(),
  submitAtHumanize: Ember.computed('submit_at', () => {
    return moment.unix(this.submit_at).humanize()
  })
});
