import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class LeaderboardViewComponent extends Component {
  @service store;

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function* () {
    const contest_id = this.contestId
    const problem_id = this.problemId

    const leaderboard = yield this.store.query(`${this.for}-leaderboard`, {
      include: 'user,college',
      exclude: 'user.*,college.*',
      sort: '-score,time',
      filter: {
        contestId: contest_id,
        problemId: problem_id
      }
    })

    return leaderboard
  }
}
