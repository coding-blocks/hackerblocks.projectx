import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { computed, action } from '@ember/object';

export default class FullScreenQuizView extends Component {
  @service store

  @alias('fetchQuestionTask.lastSuccessful.value') question

  hideQuestionPad = true
  
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

  @computed('quiz_attempt.quiz_submissions', 'question')
  get submission() {
    const submission = this.quiz_attempt.quiz_submissions.findBy('question_id', this.question.id)
    return submission || this.store.createRecord('quiz-submission', {
      question_id: this.question.id,
      currentattempt_id: this.quiz_attempt.id
    })
  }

  didReceiveAttrs() {
    this.fetchQuestionTask.perform()
  }

  @restartableTask markQuestionForReview = function *() {
    this.submission.toggleProperty('review_later')
    yield this.submission.save()
  }

  @restartableTask fetchQuestionTask = function *() {
    const index = this.index || 1
    const question_id = this.quiz.hasMany('questions').ids()[index - 1]
    return this.store.findRecord('question', question_id)
  }

  @action
  toggleQuestionPad() {
    this.toggleProperty('hideQuestionPad')
  }
}
