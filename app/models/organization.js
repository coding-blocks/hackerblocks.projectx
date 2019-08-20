import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  about: DS.attr(),
  logo: DS.attr(),
  name: DS.attr(),
  url: DS.attr()
});
