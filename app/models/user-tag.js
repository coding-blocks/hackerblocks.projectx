import Ember from 'ember';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  tag: DS.attr(),
  rating: DS.attr()
});
