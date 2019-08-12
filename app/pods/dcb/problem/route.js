import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  model(params) {
    const contest = this.modelFor('dcb').contest
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problem_id}`
      },
      contest_id: contest.id,
      include: 'solution_stubs'
    })
    return RSVP.hash({
      contest,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
  }
}
