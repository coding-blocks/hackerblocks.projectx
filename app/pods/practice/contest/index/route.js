import Route from '@ember/routing/route';
import RSVP from 'rsvp'
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store

  model() {
    const practice = this.modelFor('practice.contest').practice
    const contest = this.modelFor('practice.contest').contest
    const leaderboard = this.store.query('contest_leaderboard', {
      filter: {
        contestId: contest.get('id')
      },
      sort: '-score,time',
      include: 'college,user',
      exclude: 'college.*,user.*'
    })
    const problems = this.store.query('problem', { 
      contest_id: contest.get('id'),
      page: {
        offset: 0,
        limit: 20
      }
    })
    return RSVP.hash({
      practice,
      contest,
      leaderboard,
      problems
    })
  }

  setupController(controller, model) {
    controller.set('practice', model.practice)
    controller.set('contest', model.contest)
    controller.set('leaderboard', model.leaderboard)
    controller.set('problems', model.problems)
  }
}
