import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';
import env from 'hackerblocks/config/environment';

export default class Logout extends Route {
  @service api;
  @service session;

  async afterModel() {
    await this.api.request("/jwt/logout")
    this.session.invalidate();
    window.location = env.publicUrl
  }
}
