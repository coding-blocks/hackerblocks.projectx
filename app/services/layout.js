import Service from '@ember/service';
import { action } from '@ember/object';

export default class LayoutService extends Service {
  outsideElement = null
  
  @action
  setOutsideLayout(element) {
    this.set('outsideElement', element)
  }
}
