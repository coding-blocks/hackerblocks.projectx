import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class SmallLeaderboardView extends Component {
  @service store
  
  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function *() {
    const contest_id = this.contest.id

    const leaderboard = yield this.store.query('contest-leaderboard', {
      include: 'user',
      exclude: 'user.*',
      sort: '-score,time',
      filter: {
        contestId: contest_id,
      }
    })

    return leaderboard
  }
}
