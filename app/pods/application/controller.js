import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service navigation
  @service serverTime

  constructor(){
    super(...arguments)
    this.serverTime.syncMoment()
  }
}
