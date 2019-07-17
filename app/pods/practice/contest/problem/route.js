import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  @service store

  model(params) {
    const contest = this.modelFor('practice.contest').contest
    const levels = this.modelFor('practice.contest').levels
    const problem = this.store.findRecord('problem', params.problem_id, {
      include: 'solution_stubs',
      reload: true
    })

    return RSVP.hash({
      contest,
      problem,
      levels
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
    controller.set('levels', model.levels)
  }
}
