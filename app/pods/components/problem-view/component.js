import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';


export default class ProblemViewComponent extends Component {
  @service store

  selectedTab = 'problem'

  didReceiveAttrs() {
    this.fetchSubmissionsTask.perform()
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function *() {
    const contest_id = 1
    const problem_id = this.problem.id

    const leaderboard = yield this.store.query('problem-leaderboard', {
      filter: {
        contestId: contest_id,
        problemId: problem_id
      }
    })

    return leaderboard
  }

  @restartableTask fetchSubmissionsTask = function *() {
    const contest_id = 1
    const problem_id = this.problem.id

    const submissions = yield this.store.query('submission', {
      filter: {
        contest_id,
        problem_id
      }
    })

    return submissions
  }
}
