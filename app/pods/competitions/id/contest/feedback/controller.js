import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FeedbackController extends Controller {
  @action
  onSkip() {
    this.transitionToRoute('competitions.id')
  }

  @action
  afterSave() {
    this.transitionToRoute('competitions.id')
  }
}
