import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  image_url: DS.attr(),
  alt_text: DS.attr(),
  order: DS.attr(),
  link: DS.attr()
});
