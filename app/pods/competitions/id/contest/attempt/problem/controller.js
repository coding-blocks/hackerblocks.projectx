import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class AttemptController extends Controller {
  @service api

  @dropTask submitTask = function *() {
    try {
      this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
        method: 'POST'
      })
      this.transitionToRoute('competitions.id.contest.feedback')
    } catch (err) {
      console.error(err)
    }
  }
}
