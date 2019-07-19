import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class LeaderboardViewComponent extends Component {
  @service store;

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function* () {
    let filter = {}
    let sort = ''
    if (this.for === 'problem') {
      filter = {
        contestId: this.contestId,
        problemId: this.problemId
      }
      sort = '-score,time'
    } else if (this.for === 'contest') {
      filter = {
        contestId: this.contestId
      }
      sort = '-score,time'
    } else if (this.for === 'competition') {
      filter = {
        competitionId: this.competitionId
      }
      sort = '-score'
    }

    const leaderboard = yield this.store.query(`${this.for}-leaderboard`, {
      include: 'user,college',
      exclude: 'user.*,college.*',
      sort,
      filter
    })

    return leaderboard
  }
}
