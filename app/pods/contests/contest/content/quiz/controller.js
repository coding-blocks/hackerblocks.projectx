import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'

export default class Quiz extends Controller {
  @service submission

  @alias('submitQuizTask.lastSuccessful.value.judge_result') lastResult

  queryParams = ['q']
  q = 1

  @dropTask submitQuizTask = function *() {
    this.submission.initialize(this.contest, this.content)
    return this.submission.submitQuizTask.perform()
  }
}
