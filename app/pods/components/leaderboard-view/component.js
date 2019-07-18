import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class LeaderboardViewComponent extends Component {
  @service store
  
  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function *() {
    const contest_id = this.contest.id
    const problem_id = this.problem.id

    const leaderboard = yield this.store.query('problem-leaderboard', {
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
