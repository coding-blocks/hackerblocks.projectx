import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class LeaderboardViewComponent extends Component {
  @service store;

  @alias('fetchLeaderboardTask.lastSuccessful.value') leaderboard_rows
  @alias('leaderboard_rows.meta.myRank') myRank

  page = {
    offset: 0,
    limit: 10
  }

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @computed('columns')
  get showLanguage() {
    return this.columns && this.columns.includes('language')
  }

  @computed('columns')
  get showCollege() {
    return this.columns && this.columns.includes('college')
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
      filter,
      page: this.page
    })

    return leaderboard
  }

  @action
  setOffset(offset) {
    this.set('page.offset', offset)
    this.fetchLeaderboardTask.perform()
  }
}
