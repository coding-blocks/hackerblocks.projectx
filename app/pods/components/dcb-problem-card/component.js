import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default class DcbProblemCard extends Component {
  @computed('problem')
  get end_time() {
    return moment(this.problem.dcbProblems.start).add(86400, 'second')
  }
}
