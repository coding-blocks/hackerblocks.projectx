import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'
import { computed } from '@ember/object'

export default class Quiz extends Controller {
  @service submission

  @alias('submitQuizTask.lastSuccessful.value.judge_result') lastResult

  queryParams = ['q']
  q = 1

  @computed('submitQuizTask.lastSuccessful.value.judge_result')
  get totalCorrect () {
    const result = this.get('submitQuizTask.lastSuccessful.value.judge_result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.correctlyAnswered.length
    }, 0)
  }

  @computed('submitQuizTask.lastSuccessful.value.judge_result')
  get totalIncorrect() {
    const result = this.get('submitQuizTask.lastSuccessful.value.judge_result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.incorrectlyAnswered.length
    }, 0)
  }

  @dropTask submitQuizTask = function *() {    
    this.submission.initialize(this.contest, this.content)
    return this.submission.submitQuizTask.perform()
  }

  @dropTask attemptAgain = function *() {    
    window.location.reload()
  }
}
