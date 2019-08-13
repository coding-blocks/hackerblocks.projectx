import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { run } from '@ember/runloop';

export default class QuestionContainer extends Component {
  didRender () {
    const questionContainer = document.querySelector('.question-container')
    if (window.MathJax && questionContainer) {
      run.later (_ => MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionContainer]))
    }
  }
  @dropTask selectAnswerTask = function *(choiceId) {
    this.submission.set('answer_id', choiceId)
    return yield this.submission.save()
  }
}
