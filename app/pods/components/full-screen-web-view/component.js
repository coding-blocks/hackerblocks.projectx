import Component from '@ember/component';
import { action } from '@ember/object';

export default class FullScreenWebViewComponent extends Component {
  currentTab = 'problem'

  @action
  handleTextChange(event) {
    this.set(event.type, event.content)
  }

}