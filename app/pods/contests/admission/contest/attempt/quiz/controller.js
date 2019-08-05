import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';

export default class QuizController extends Controller {
  @service api

  queryParams = ['q']

  @action
  changeQuestion(question_id) {
    this.set('q', question_id)
  }

  @dropTask submitTask = function *() {
    this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
      method: 'POST'
    })
    this.transitionToRoute('contests.admission.contest.feedback')
  }
}
