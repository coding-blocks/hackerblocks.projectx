import Component from '@ember/component';
import { timeout } from 'ember-concurrency';
import { dropTask } from 'ember-concurrency-decorators';

export default class SubmissionStatusComponent extends Component {
  status = 'Submitting Your Code'

  didReceiveAttrs() {
    this.setStatusTask.perform()
  }

  @dropTask setStatusTask = function* () {
    let timer = 60
    while (timer--) {
      console.log(timer)
      if (timer < 55 && timer > 45) {
        this.set('status', 'Compiling Your Code')
      } else if (timer < 45 && timer > 35) {
        this.set('status', 'Running Your Code')
      } else if (timer < 35 && timer > 10) {
        this.set('status', 'Judging Your Submission')
      } else if (timer < 10) {
        this.set('status', 'Finalizing the Result')
      }
      yield timeout(1000)
    }
  }
}
