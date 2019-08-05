import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ArchivedContestCard extends Component {
  @computed('contest')
  get problemCount() {
    return this.contest.hasMany('problems').ids().length
  }
}
