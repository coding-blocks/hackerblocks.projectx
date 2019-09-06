import Route from '@ember/routing/route';
import env from 'hackerblocks/config/environment';

export default class LoginRoute extends Route {
  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`; 

  beforeModel() {
    localStorage.setItem('redirectionPath', this.get('router.currentURL') || window.location.pathname)
  }

  activate () {
    window.location.href = this.loginUrl
  }
}
