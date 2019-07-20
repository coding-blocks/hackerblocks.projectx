import Component from '@ember/component';
import { computed } from '@ember/object';

export default class FullScreenProblemListComponent extends Component {
  @computed('contest.problems')
  get problemIds() {
    return this.contest.hasMany('problems').ids()
  }
}
