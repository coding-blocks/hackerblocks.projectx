import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class ContestList extends Component {
  @service store
  didReceiveAttrs() {
    this.set('taskTrigger', true)
  }

}
