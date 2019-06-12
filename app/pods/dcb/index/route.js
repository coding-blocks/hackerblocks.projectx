import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class DCBIndexRoute extends Route {
  @service api

  model() {
    const contest = this.modelFor('dcb')
    const problems = contest.get('dcb.problems')
    const leaderboard = this.store.query('contest_leaderboard', {
      filter: {
        contestId: contest.get('id')
      },
      include: 'college,user',
      exclude: 'college.*,user.*'
    })
    const levels = this.store.query('user_level', {
      filter: {
        contestId: contest.get('id')
      }
    })
    return RSVP.hash({
      contest,
      problems,
      leaderboard,
      levels
    })
  }

  setupController(controller, model) {
    controller.set('dcb', model.contest.dcb)
    controller.set('contest', model.contest)
    controller.set('problems', model.problems)
    controller.set('leaderboard', model.leaderboard)
    controller.set('levels', model.levels)
  }
}
