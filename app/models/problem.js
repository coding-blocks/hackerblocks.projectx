import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  difficulty: DS.attr(),
  mem_limit: DS.attr(),
  time_limit: DS.attr(),
  image: DS.attr(),
  source: DS.attr(),
});
