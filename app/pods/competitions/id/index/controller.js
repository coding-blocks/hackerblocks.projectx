import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class Index extends Controller {
  @action
  onParticipate(contest_id) {
    this.transitionToRoute('competitions.id.contest', contest_id)
  }
}
