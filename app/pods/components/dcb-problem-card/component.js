import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default class DcbProblemCard extends Component {
  @computed('content')
  get end_time() {
    return moment(this.content.dcbContents.start).add(86400, 'second')
  }

  @computed('content')
  get ended() {
    return moment(this.content.dcbContents.start).add(86400, 'second') < moment()
  }
}
