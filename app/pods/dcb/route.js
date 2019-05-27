import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class DCBRoute extends Route {
  model() {
    return this.store.findRecord('dcb', 2)
  }
}
