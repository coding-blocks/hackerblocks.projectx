import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default class ContestCard extends Component {
  @computed('contest.duration')
  get durationAsHour () {
    return this.get('contest.duration') ? moment.duration(this.get('contest.duration')*1000).as("hours").toFixed(2) + "hrs" : "--"
  }
}
