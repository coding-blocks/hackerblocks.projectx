import Component from '@ember/component';
import { computed } from '@ember/object';
import moment, { duration } from 'moment';

export default class ContestHeaderComponent extends Component {
  @computed('top_content')
  get top_content_end() {
    return moment(this.top_content.dcbContents.start).add(86400, 'second')
  }

  @computed('contest.start_time')
  get humanize_date() {
    return moment(this.top_content.dcbContents.start).format('dddd, D MMM')
  }
}
