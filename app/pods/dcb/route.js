import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class DCBRoute extends Route {
  async model() {
    const dcb = await this.store.findRecord('dcb', 1, {
      include: 'contest'
    })
    const contest = await dcb.contest
    const levels = await this.store.query('user_level', {
      filter: {
        contestId: contest.get('id')
      }
    })
    const problems = dcb.get('problems')
    return RSVP.hash({
      contest,
      level: levels.toArray()[0],
      problems
    })
  }
}
