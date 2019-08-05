import Route from '@ember/routing/route';

export default class IdRoute extends Route {
  model(params) {
    return this.store.findRecord('user', params.user_id)
  }

  setupController(controller, model){
    controller.set('user', model)
  }
};
