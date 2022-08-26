import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class Logout extends Route {
  @service api;
  @service session;

  async beforeModel(transition) { 
    try {
      window.localStorage.clear()
      await this.session.invalidate();
    } catch (err) {
      window.location.replace("/")
    }
  }
}
