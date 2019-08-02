import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  model(params) {
    const contest = this.modelFor('dcb').contest
    const problem = this.store.peekRecord('problem', params.problem_id)
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
