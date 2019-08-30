import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class AttemptController extends Controller{
  @dropTask submitTask = function* () {
    later(() => {
      return this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
        method: 'POST'
      })
    }, Math.floor(Math.random() * 15) * 1000)
    this.transitionToRoute('contests.contest.feedback')
  }

  @action onTimerEnd() {
    this.transitionToRoute('contests.contest.feedback')
  }
}
