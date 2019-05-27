import Route from '@ember/routing/route';

export default class ProblemRoute extends Route {
  model(params) {
    return this.store.findRecord('problem', params.problem_id)
  }
}
