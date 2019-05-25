import Route from '@ember/routing/route';

export default class DCBRoute extends Route {
  model() {
    return this.store.findRecord('contest', 1)
  }

  setupController(controller, model) {
    controller.set('contest', model)
  }
}
