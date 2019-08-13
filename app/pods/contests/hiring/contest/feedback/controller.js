import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FeedbackController extends Controller {
  @action
  onSkip() {
    this.transitionToRoute('contests.hiring')
  }

  @action
  afterSave() {
    this.transitionToRoute('contests.hiring')
  }
}
