import Component from '@ember/component';
import { computed } from '@ember/object';

export default class LeaderboardViewComponent extends Component {
  @computed('leaderboard')
  get sorted_leaderboard() {
    return this.leaderboard.sortBy('score').reverse()
  }
}
