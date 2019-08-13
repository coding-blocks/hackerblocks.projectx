import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

export default class QuizController extends Controller {
  @service api

  queryParams = ['q']

  q = 1

  @action
  changeQuestion(question_id) {
    this.set('q', question_id)
  }

  @dropTask submitTask = function *() {
    this.api.request(`contest-attempts/${this.contest_attempt.id}/submit`, {
      method: 'POST'
    })
    this.transitionToRoute('contests.hiring.contest.feedback')
  }
}
