import Component from '@ember/component';
import { computed } from '@ember/object';
import Moment from 'moment';

export default class UpcomingCompetitionContestComponent extends Component {
  @computed('contest')
  get contest_end_time() {
    return Moment(this.contest.end_time)
  }

  @computed('contest.problems.@each')
  get problemCount() {
    return this.contest.hasMany('problems').ids().length
  }
}
