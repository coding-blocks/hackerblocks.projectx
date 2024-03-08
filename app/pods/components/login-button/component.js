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
  loginUrl = `${env.nuxtPublicUrl}`;

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
    const logoutUrl = env.oneauthURL + '/logout?redirect=' + env.nuxtPublicUrl + 'logout'
    window.location.href = logoutUrl
  }

  @action
  logIn () {
    localStorage.setItem('redirectionPath', window.location.pathname)
    localStorage.setItem('loginPrompt', true)
    window.location.href = this.loginUrl
  }
}
