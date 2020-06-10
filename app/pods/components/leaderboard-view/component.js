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
  hasRows = false

  didReceiveAttrs() {
    this.fetchCollegesTask.perform()
  }

  @computed('columns')
  get showCollege() {
    return this.columns && this.columns.includes('college')
  }
  @computed('contestId')
  get filterUsingPlagiarism() {
    const contest = this.store.peekRecord('contest', this.contestId)
    return contest.plagiarismFiltering
  }
  @computed('contestId')
  get sortField() {
    const contest = this.store.peekRecord('contest', this.contestId)
    return contest.plagiarismFiltering ? 'score_after_plagiarism_filtering' : 'score'
  }

  @restartableTask fetchLeaderboardTask = function* () {
    let filter = {}
    let sort = ''
    if (this.for === 'content') {
      filter = {
        contestId: this.contestId,
        contentId: this.contentId
      }
      sort = `-${this.sortField},time`
    } else if (this.for === 'contest') {
      filter = {
        contestId: this.contestId
      }
      sort = `-${this.sortField},time`
    } else if (this.for === 'competition') {
      filter = {
        competitionId: this.competitionId
      }
      sort = `-${this.sortField}`
    }
    if (this.selectedCollege) {
      filter.collegeId = this.selectedCollege.id
    }

    const leaderboard = yield this.store.query(`${this.for}-leaderboard`, {
      include: 'user,college',
      exclude: 'user.*,college.*',
      sort,
      filter,
      page: this.page
    })

    this.set('hasRows', this.hasRows || leaderboard.length !== 0)

    return leaderboard
  }
  @restartableTask fetchCollegesTask = function *(query = '') {
    return yield this.store.query('college', {
      filter: {
        name: {
          $iLike: `%${query}%`
        }
      }
    })
  }

  @action
  applyFilter() {
    this.fetchLeaderboardTask.perform()
    this.set('page.offset', 0)
  }

  @action
  setOffset(offset) {
    this.set('page.offset', offset)
    this.fetchLeaderboardTask.perform()
  }
}
