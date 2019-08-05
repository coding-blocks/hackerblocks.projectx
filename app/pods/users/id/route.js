import Route from '@ember/routing/route';

export default class IdRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    }
  }

  model(params) {
    return this.store.findRecord('user', params.user_id)
  }

  setupController(controller, model){
    controller.set('user', model)
  }
};
