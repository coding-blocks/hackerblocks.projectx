import Ember from 'ember';
import moment from 'moment';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  status: DS.attr(),
  contestAttempt: DS.belongsTo('contest-attempt'),
  content: DS.belongsTo('content')
});
