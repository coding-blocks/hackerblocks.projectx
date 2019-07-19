import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ContestRoute extends Route {
  async model(params) {
    const contest = this.store.findRecord('contest', params.contest_id)

    return RSVP.hash({
      contest
    })
  }
}
