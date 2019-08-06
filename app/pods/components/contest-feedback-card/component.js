import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';

export default class ContestFeedbackCard extends Component {
  @dropTask saveFeedbackTask = function *() {
    yield this.feedback.save()
    this.afterSave()
  }
}
