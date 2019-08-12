import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';

export default class OverallLeaderboardView extends Component {
  @service store

  @alias('fetchLeaderboardTask.lastSuccessful.value') leaderboardRows
  @alias('fetchTopThree.lastSuccessful.value') topThreeRows
  @alias('leaderboardRows.meta.myRank') myRank

  page = {
    offset: 3,
    limit: 10
  }

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
    this.fetchTopThree.perform()
  }

  @restartableTask fetchTopThree = function *() {
    return yield this.store.query('overall-leaderboard', {
      allTime: true,
      include: 'user',
      sort: '-score',
      page: {
        limit: 3
      }
    })
  }
  @restartableTask fetchLeaderboardTask = function *() {
    return yield this.store.query('overall-leaderboard', {
      allTime: true,
      include: 'user',
      sort: '-score',
      page: this.page
    })
  }

  @action
  setOffset(offset) {
    this.set('page.offset', offset)
    this.fetchLeaderboardTask.perform()
  }
}
