import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class Logout extends Route {
  @service api;
  @service session;

  async beforeModel(transition) {
    await this.api.request("/jwt/logout")
    await this.session.invalidate();
    window.location = '/'
  }
}
