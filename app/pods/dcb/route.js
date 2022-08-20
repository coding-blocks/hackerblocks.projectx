import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class DCBRoute extends Route {
  async model() {
    const dcb = await this.store.findRecord('dcb', 1)
    const contest = await dcb.contest
    const contents = dcb.get('contents')
    return RSVP.hash({
      dcb,
      contest,
      contents
    })
  }
}
