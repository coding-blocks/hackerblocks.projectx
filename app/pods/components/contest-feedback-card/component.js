import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency'

export default class ContestFeedbackCard extends Component {
  @dropTask saveFeedbackTask = function *() {
    yield this.feedback.save()
    yield timeout(2000)
    this.afterSave()
  }
}
