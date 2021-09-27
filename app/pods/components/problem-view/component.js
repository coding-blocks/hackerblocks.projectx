import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';


export default class ProblemViewComponent extends Component {
  @service store
  @service api

  selectedTab = 'problem'
  copiedSubmission = ''

  @action
  copySubmission(submission) {
    this.set('copiedSubmission', submission);
  }
}
