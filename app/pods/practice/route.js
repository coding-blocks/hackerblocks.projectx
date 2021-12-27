import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PracticeRoute extends Route {
  @service webengage

  activate() {
    this.webengage.trackEvent("Practice", {})
  }
}
