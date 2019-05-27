import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  model(params) {
    const dcb = this.modelFor('dcb')
    const problem = this.store.findRecord('problem', params.problem_id)
    const leaderboard = this.store.query('problem_leaderboard', {
      filter: {
        contestId: dcb.contest.get('id'),
        problemId: params.problem_id
      },
      include: 'college,user',
      exclude: 'college.*,user.*'
    })
    return RSVP.hash({
      problem,
      leaderboard
    })
  }

  setupController(controller, model) {
    controller.set('problem', model.problem)
    controller.set('leaderboard', model.leaderboard)
  }
}
