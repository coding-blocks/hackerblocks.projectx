import Component from '@ember/component';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class CheckboxField extends Component {
  selected = A()

  @action
  updateFieldValue(val) {
    if (this.selected.includes(val)) {
      this.selected.removeObject(val)
    } else {
      this.selected.addObject(val)
    }

    this.onUpdate(this.selected)
  }
}
