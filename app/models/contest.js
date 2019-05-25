import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  level_id: DS.attr(),
  start_time: DS.attr(),
  end_time: DS.attr(),
  duration: DS.attr(),
  show_quiz_grades: DS.attr(),
  created_by: DS.attr(),
  private_code: DS.attr(),
  passing_score: DS.attr(),
  image: DS.attr(),
  oldStatus: DS.attr(),
  status: DS.attr(),
  show_banner: DS.attr(),
  max_attempts: DS.attr(),
  locked_contest: DS.attr(),
  show_leaderboard: DS.attr(),
  show_tags: DS.attr(),
  moss: DS.attr(),
  allow_editorial_unlocks: DS.attr(),
  allow_testcase_unlocks: DS.attr(),
  plagiarismFiltering: DS.attr()
});
