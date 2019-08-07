import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OverallLeaderboardView extends Component {
  @service store

  @alias('fetchLeaderboardTask.lastSuccessful.value') leaderboardRows
  @alias('leaderboardRows.meta.myRank') myRank

  page = {
    offset: 0,
    limit: 10
  }

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }

  @restartableTask fetchLeaderboardTask = function *() {
    return yield this.store.query('overall-leaderboard', {
      include: 'user',
      page: this.page
    })
  }

  @action
  setOffset(offset) {
    this.set('page.offset', offset)
    this.fetchLeaderboardTask.perform()
  }
}
