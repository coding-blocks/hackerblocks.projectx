import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class ContestsRoute extends Route {
  @service webengage

  activate() {
    this.webengage.trackEvent("Contests", {})
  }
}
