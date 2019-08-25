import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FeedbackController extends Controller {
  @action
  onSkip() {
    this.transitionToRoute('contests')
  }

  @action
  afterSave() {
    this.transitionToRoute('contests')
  }
}
