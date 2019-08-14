import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  message: DS.attr(),
  notiIcon: DS.attr(),
  bgColor: DS.attr(),
  link: DS.attr()
});
