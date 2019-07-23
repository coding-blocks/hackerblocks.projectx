import Ember from 'ember';
import moment from 'moment';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  start_time: DS.attr(),
  end_time: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  start_time_moment: Ember.computed('start_time', function() {
    return moment(this.start_time)
  }),
  end_time_moment: Ember.computed('end_time', function() {
    return moment(this.end_time)
  })
});
