import Component from '@ember/component';
import { computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CompetitionContestComponent extends Component {
  @service store
  @service currentUser

  showStartDialog = false

  @computed('contest')
  get problemCount() {
    if (this.contest) {
      return this.contest.hasMany('problems').ids().length
    }
  }

  @restartableTask createAttemptTask = function *() {
    const contest_attempt = this.store.createRecord('contest-attempt', {
      contest: this.contest
    })
    yield contest_attempt.save()
    this.transitionToRoute('competitions.id.contest', this.contest.id)
  }
}
