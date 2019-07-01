import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class DCBRoute extends Route {
  async model() {
    const contest = await this.store.findRecord('contest', 1, {
      include: 'dcb'
    })
    const levels = this.store.query('user_level', {
      filter: {
        contestId: contest.get('id')
      }
    })
    const problems = contest.get('dcb.problems')
    return RSVP.hash({
      contest,
      levels,
      problems
    })
  }
}
