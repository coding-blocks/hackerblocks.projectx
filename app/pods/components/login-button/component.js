import Component from "@ember/component";
import env from "hackerblocks/config/environment";
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class LoginButton extends Component {
  @service api;
  @service session;
  @service currentUser;
  @service store;
  @service router;

  tagName = 'span'
  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`;

  @action
  invalidateSession() {
    let logout = () => {
      this.get("api")
      .request("/v2/jwt/logout")
      .then(() => {
        this.get("session").invalidate()
      });
    }

    let timeout = setTimeout (logout, 4000)
    const logoutUrl = env.oneauthURL + '/logout?redirect=' + env.publicUrl + '/logout'
    window.location.href = logoutUrl
  }

  @action
  logIn () {
    localStorage.setItem('redirectionPath', this.get('router.currentURL'))
    window.location.href = this.loginUrl
  }
}
