import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class AttemptController extends Controller {
  @service api

  @restartableTask submitTask = function *() {
    try {
      yield this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
        method: 'POST'
      })
      this.transitionToRoute('competitions.id')
    } catch (err) {
      console.error(err)
    }
  }
}
