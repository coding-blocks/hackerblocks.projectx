import Route from '@ember/routing/route';
import env from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session
  @service store
  @service webengage

  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`; 

  afterModel() {
    if(this.session.isAuthenticated){
      this.transitionTo('index')
    } else {
      window.location.href = this.loginUrl
    }
  }
}
