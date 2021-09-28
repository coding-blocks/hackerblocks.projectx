import Component from '@ember/component';
import { action } from '@ember/object';

export default class FullScreenProblemView extends Component {
  currentTab = 'problem'
  copiedSubmission = ''

  @action
  copySubmission(submission) {

    /*
      copying class instance
      to make child component re-render when user copy the same code.
    */
    var sub = Object.assign(Object.create(Object.getPrototypeOf(submission)), submission);

    this.set('copiedSubmission', sub);
  }
}
