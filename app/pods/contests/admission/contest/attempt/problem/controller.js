import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ProblemController extends Controller {
  @service api

  @dropTask submitTask = function *() {
    this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
      method: 'POST'
    })
    this.transitionToRoute('contests.admission.contest.feedback')
  }
}
