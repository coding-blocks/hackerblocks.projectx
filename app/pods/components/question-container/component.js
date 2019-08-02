import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';

export default class QuestionContainer extends Component {
  @dropTask selectAnswerTask = function *(choiceId) {
    this.submission.set('answer_id', choiceId)
    return yield this.submission.save()
  }
}
