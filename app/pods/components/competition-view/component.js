import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class CompetitionViewComponent extends Component {
  @service api
  @service store
  @service currentUser

  @alias('fetchRecentContestTask.lastSuccessful.value') upcomingContest
  @alias('fetchCurrentAttempt.lastSuccessful.value') currentAttempt

  @computed('competition.contests')
  get archivedContests() {
    return this.competition.contests.filter(contest => contest.hasEnded)
  }

  didReceiveAttrs() {
    this.fetchCurrentAttempt.perform()
  }

  @dropTask createCurrentAttempt = function *() {
    yield this.store.createRecord('competition-attempt', {
      competition: this.competition
    }).save()
    this.set('showRegisteredModal', true)
    yield this.fetchCurrentAttempt.perform()
  }
  @restartableTask fetchCurrentAttempt = function *() {
    const currentAttempt = yield this.store.queryRecord('competition-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      competition_id: this.competition.id
    })
    if (currentAttempt.id) {
      this.fetchRecentContestTask.perform()
      return currentAttempt
    }
  }
  @restartableTask fetchRecentContestTask = function *() {
    const payload = yield this.api.request(`competitions/${this.competition.id}/recent-contest`, {
      method: 'GET'
    })
    this.store.pushPayload('contest', payload)
    const contest = this.store.peekRecord('contest', payload.data.id)
    return contest
  }
}
