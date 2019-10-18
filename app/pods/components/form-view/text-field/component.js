import Component from '@ember/component';
import { action } from '@ember/object';

export default class TextField extends Component {
  @action
  onChange(event) {
    this.onUpdate(event.target.value)
  }
}
