import Component from '@ember/component';
import { computed } from '@ember/object';

export default class QuestionPill extends Component {
  @computed('submissions.@each')
  get color() {
    const submission = this.submissions.findBy('question_id', this.question_id) 
    if (submission) {
      return submission.review_later ?
      'bg-orange' :
      'bg-green'
    }
    return 'bg'
  }
}
