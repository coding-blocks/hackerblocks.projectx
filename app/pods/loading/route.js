import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoadingRoute extends Route {
  @service navigation
  
  @action
  willTransition() {
    this.navigation.setVisibility(true)
  }
  
  @action
  didTransition() {
    this.navigation.setVisibility(false)
  }
}
