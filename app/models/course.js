import DS from "ember-data";
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  logo: DS.attr(),
  theme: DS.attr(),
  courseContests: DS.hasMany("course-contest"),
  "contest-count": DS.attr(),
});
