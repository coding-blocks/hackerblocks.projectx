import Component from '@ember/component';
import { computed } from '@ember/object';

export default class QuestionPill extends Component {
  @computed('submissions.@each.review_later', 'submissions.@each.answer_ids')
  get color() {    
    if (!this.submissions) {      
      return 'bg'
    }

    const submission = this.submissions.findBy('question_id', this.question_id)    
    if (!submission) {      
      return 'bg'
    }

    return submission.review_later ?
      'bg-orange' :
      submission.answer_ids.length ? 'bg-green' : 'bg'
  }
}
