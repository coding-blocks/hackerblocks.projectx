import Route from '@ember/routing/route';
import RSVP from 'rsvp'
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    },
    difficulty: {
      refreshModel: false
    },
    status: {
      refreshModel: false
    }
  }

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

    return RSVP.hash({
      practice,
      contest,
      leaderboard,
      // problems
    })
  }

  setupController(controller, model) {
    controller.set('practice', model.practice)
    controller.set('contest', model.contest)
    controller.set('leaderboard', model.leaderboard)
  }
}
