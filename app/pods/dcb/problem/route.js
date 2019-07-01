import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  model(params) {
    const contest = this.modelFor('dcb').contest
    const levels = this.modelFor('dcb').levels
    const problem = this.store.peekRecord('problem', params.problem_id)
    const leaderboard = this.store.query('problem_leaderboard', {
      filter: {
        contestId: contest.get('id'),
        problemId: params.problem_id
      },
      include: 'college,user',
      exclude: 'college.*,user.*'
    })
    return RSVP.hash({
      contest,
      problem,
      leaderboard,
      levels
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
    controller.set('leaderboard', model.leaderboard)
    controller.set('levels', model.levels)
  }
}
