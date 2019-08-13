import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return this.modelFor('contests.hiring.contest')
  }

  setupController(controller, model) {
    controller.set('hiring_contest', model.hiring_contest)
    controller.set('contest', model.contest)
  }
}
