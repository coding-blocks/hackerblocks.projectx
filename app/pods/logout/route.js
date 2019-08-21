import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class Logout extends Route {
  @service api;
  @service session;

  async afterModel(transition) {
    await this.api.request("/jwt/logout")
    this.session.invalidate();
    window.location = '/'
  }
}
