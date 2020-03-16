import DS from 'ember-data';
import Moment from 'moment';
const { Model } = DS;

export default Model.extend({
  contest: DS.belongsTo('contest'),
  contents: DS.hasMany('content'),
  top_content: Ember.computed('contents', function() {
    const contents = this.get('contents')
    return contents.find(content => content.dcbContents && Moment(content.dcbContents.start) > Moment().subtract(1, 'day'))
  })
});
