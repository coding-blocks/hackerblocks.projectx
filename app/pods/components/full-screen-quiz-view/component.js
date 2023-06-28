import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { computed, action } from '@ember/object';

export default class FullScreenQuizView extends Component {
  @service store

  @alias('fetchQuestionTask.lastSuccessful.value') question

  hideQuestionPad = true

  didReceiveAttrs() {
    this.fetchQuestionTask.perform()
  }
  
  @computed('quiz.questions')
  get questionCount() {
    return this.quiz.hasMany('questions').ids().length
  }

  @computed('quiz.questions')
  get questionIds() {
    return this.quiz.hasMany('questions').ids()
  }

  @computed('index')
  get prevIndex() {
    if (this.index && this.index != 1){
      return +this.index - 1
    }
  }

  @computed('index')
  get nextIndex() {
    const index = this.index || 1
    if (index < this.questionCount) {
      return +this.index + 1
    }
  }

  @computed('contentAttempt', 'fetchQuestionTask.lastSuccessful.value')
  get questionSubmission() {
    const question = this.fetchQuestionTask.lastSuccessful.value
    const submission = 
      this.contentAttempt.quizQuestionSubmissions.findBy(
        'question_id',
        question.id
      ) 
    return submission || this.store.createRecord('quiz-question-submission', {
      contentAttempt: this.contentAttempt,
      question_id: question.id
    })
  }

  @restartableTask fetchQuestionTask = function *() {
    const questionId = yield this.quiz.hasMany('questions').ids().objectAt(this.index-1)
    return yield this.store.findRecord('question', questionId)
  }

  @dropTask reviewLaterTask = function *() {
    this.questionSubmission.set('review_later', !this.questionSubmission.get('review_later'))
    return this.questionSubmission.save()
  }

  @action
  toggleQuestionPad() {
    this.toggleProperty('hideQuestionPad')
  }
}
