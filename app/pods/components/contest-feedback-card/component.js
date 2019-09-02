import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';

export default class ContestFeedbackCard extends Component {
  @dropTask saveFeedbackTask = function *() {
    later(() => {
      this.feedback.save()
    }, (Math.random() * 15) * 1000)
    yield timeout(2000)
    this.afterSave()
  }
}
