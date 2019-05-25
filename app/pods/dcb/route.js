import Route from '@ember/routing/route';

export default class DCBRoute extends Route {
  model() {
    return this.store.findRecord('dcb', 2)
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
