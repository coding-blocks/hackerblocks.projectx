import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
// import { action, computed } from '@ember/object';

export default class CompetitionViewComponent extends Component {
  @service api
  @service store

  // cardScrollIndex = 0

  @alias('fetchTopThreeTask.lastSuccessful.value') topThree
  @alias('fetchRecentContestTask.lastSuccessful.value') upcomingContest

  didReceiveAttrs() {
    this.fetchRecentContestTask.perform()
    this.fetchTopThreeTask.perform()
  }

  @restartableTask fetchRecentContestTask = function *() {
    const payload = yield this.api.request(`competitions/${this.competition.id}/recent-contest`, {
      method: 'GET'
    })
    this.store.pushPayload('contest', payload)
    const contest = this.store.peekRecord('contest', payload.data.id)
    return contest
  }

  @restartableTask fetchTopThreeTask = function *() {
    return yield this.store.query('competition-leaderboard', {
      include: 'user,college',
      exclude: 'user.*,college.*',
      sort: '-score',
      filter: {
        competitionId: this.competition.id
      },
      page: {
        offset: 0,
        limit: 3
      }
    })
  }

  // @computed ('cardScrollIndex')
  // get showScrollLeft () {
  //   return this.cardScrollIndex - 4 >= 0
  // }

  // @computed ('competition.contests', 'cardScrollIndex')
  // get showScrollRight () {
  //   return this.cardScrollIndex + 4 < this.competition.contests.length
  // }

  // @action
  // seek (direction) {
  //   const row = this.element.querySelector('#carousel-card-row')
  //   switch (direction) {
  //     case 'left':
  //       this.incrementProperty('cardScrollIndex', -4)
  //       break;
  //     case 'right':
  //         this.incrementProperty('cardScrollIndex', +4)
  //   }

  //   row.scrollTo(
  //     row.querySelector('#card-' + this.cardScrollIndex).offsetLeft,
  //     0
  //   )
  // }
}
