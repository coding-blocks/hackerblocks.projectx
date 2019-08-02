import Component from '@ember/component';
import { computed } from '@ember/object';

export default class QuestionPill extends Component {
  @computed('submissions.@each')
  get color() {
    return this.submissions.findBy('question_id', this.question_id) ?
    'bg-green':
    'bg'
  }
}
