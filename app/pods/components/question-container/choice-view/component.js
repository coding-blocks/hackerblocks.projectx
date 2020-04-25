import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ChoiceView extends Component {
  @computed('submission.answer_id')
  get selected() {
    return this.submission.answer_ids.includes(this.choice.id)
  }
}
