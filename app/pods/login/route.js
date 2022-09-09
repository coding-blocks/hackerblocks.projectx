import Route from '@ember/routing/route';
import env from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session
  @service store

  loginUrl = `${env.nuxtPublicUrl}`; 

  afterModel() {
    if(this.session.isAuthenticated){
      this.transitionTo('index')
    } else {
      localStorage.setItem('loginPrompt', true)
      window.location.href = this.loginUrl
    }
  }
}
