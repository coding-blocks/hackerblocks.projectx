import Component from '@ember/component';
import { computed } from '@ember/object';
import Moment from 'moment';

export default class UpcomingCompetitionContestComponent extends Component {
  @computed('contest')
  get contest_end_time() {
    return Moment(this.contest.end_time)
  }

  @computed('contest')
  get contest_start_time () {
    return Moment(this.contest.start_time)
  }

  // has this contest started yet?
  @computed('contest.start_time')
  get hasStarted () {
    return this.contest.start_time < new Date()
  }
}
