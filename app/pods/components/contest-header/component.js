import Component from '@ember/component';
import { computed } from '@ember/object';
import moment, { duration } from 'moment';

export default class ContestHeaderComponent extends Component {
  startTime = moment()
  duration = 10000
  @computed('contest.start_time')
  get humanize_date() {
    return moment(this.contest.start_time).format('dddd, D MMM')
  }
}
