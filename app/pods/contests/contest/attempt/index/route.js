import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return this.modelFor('contests.contest')
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
