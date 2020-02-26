import Component from '@ember/component';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuizView extends Component {
  @service store

  didReceiveAttrs() {
    this.set('taskTrigger', true)
  }

  @computed('fetchQuestionTask.lastSuccessful.value')
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
    return (yield this.quiz.get('questions')).objectAt(this.index-1)
  }

  @dropTask reviewLaterTask = function *() {
    this.questionSubmission.set('review_later', !this.questionSubmission.get('review_later'))
    return this.questionSubmission.save()
  }
}
