import Controller from '@ember/controller';
import { action } from '@ember/object'

export default class IndexController extends Controller {
  @action
  onAfterCreate() {
    this.transitionToRoute('contests.admission.contest.attempt')
  }
}
