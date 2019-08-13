import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class DCBRoute extends Route {
  async model() {
    const dcb = await this.store.findRecord('dcb', 1, {
      include: 'contest,problem'
    })
    const contest = await dcb.contest
    const problems = dcb.get('problems')
    return RSVP.hash({
      dcb,
      contest,
      problems
    })
  }
}
