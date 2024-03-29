import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service navigation
  @service layout
  @service serverTime
  @service currentUser
  @service monitorer

  init() {
    this._super(...arguments) 
    this.monitorer
  }
}
