import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class DCBIndexRoute extends Route {
  @service api

  model() {
    const dcb = this.modelFor('dcb')
    const problems = dcb.problems
    const leaderboard = this.store.query('contest_leaderboard', {
      filter: {
        contestId: dcb.contest.get('id')
      },
      include: 'college,user',
      exclude: 'college.*,user.*'
    })
    return RSVP.hash({
      dcb,
      problems,
      leaderboard
    })
  }

  setupController(controller, model) {
    controller.set('dcb', model.dcb)
    controller.set('contest', model.dcb.contest)
    controller.set('problems', model.problems)
    controller.set('leaderboard', model.leaderboard)
  }
}
