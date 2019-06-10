import Component from '@ember/component';
import { computed } from '@ember/object';
import moment, { duration } from 'moment';

export default class ContestHeaderComponent extends Component {
  @computed('top_problem')
  get top_problem_end() {
    return moment(this.top_problem.dcbProblems.start).add(86400, 'second')
  }

  @computed('contest.start_time')
  get humanize_date() {
    return moment(this.contest.start_time).format('dddd, D MMM')
  }
}
