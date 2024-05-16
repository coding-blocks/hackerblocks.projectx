import Ember from 'ember';
import moment from 'moment';
import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  start_time: DS.attr(),
  end_time: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  progresses: DS.hasMany('progress'),
  start_time_moment: Ember.computed('start_time', function() {
    return moment(this.start_time)
  }),
  end_time_moment: Ember.computed('end_time', function() {
    return moment(this.end_time)
  }),
  monitorerData: DS.attr(),
  tabSwitchCount: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['tab-switch-count'] || 0
  }),
  tabSwitchTimePenaltyMinutes: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['tab-switches-penalty'] || 0
  }),
  windowResizeCount: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['window-resize-count'] || 0
  }),
  windowResizeTimePenaltyMinutes: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['window-resizes-penalty'] || 0
  }),
  windowMoveCount: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['window-move-count'] || 0
  }),
  windowMoveTimePenaltyMinutes: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['window-moves-penalty'] || 0
  }),
  noFaceCount: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['no-face-count'] || 0
  }),
  noFaceTimePenaltyMinutes: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['no-faces-penalty'] || 0
  }),
  multipleFacesCount: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['multiple-faces-count'] || 0
  }),
  multipleFacesTimePenaltyMinutes: Ember.computed('monitorerData', function() {
    return this.monitorerData && this.monitorerData['multiple-faces-penalty'] || 0
  }),
});
