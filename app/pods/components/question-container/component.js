import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { run } from '@ember/runloop';

export default class QuestionContainer extends Component {
  // classNames = ["h-100"]
  didRender () {
    const questionContainer = document.querySelector('.code-window__question-area')
    if (window.MathJax && questionContainer) {
      run.later (_ => MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionContainer]))
    }
  }
  @dropTask selectAnswerTask = function *(choiceId) {
    if (this.submission.answer_ids.includes(choiceId)) {
      this.submission.answer_ids.removeObject(choiceId)
    } else {
      this.submission.answer_ids.addObject(choiceId)
    }
    return yield this.submission.save()
  }
}
