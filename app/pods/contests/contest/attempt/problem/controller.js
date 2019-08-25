import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';

export default class ProblemController extends Controller {
  @service api

  @dropTask submitTask = function *() {
    this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
      method: 'POST'
    })
    this.transitionToRoute('contests.contest.feedback')
  }

  @action onTimerEnd(){
    this.transitionToRoute('contests.contest.feedback')
  }
}
