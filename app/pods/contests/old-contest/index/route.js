import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    },
    difficulty: {
      refreshModel: false
    },
    status: {
      refreshModel: false
    },
    tags: {
      refreshModel: false
    }
  }
  
  model() {
    return this.modelFor('contests.old-contest')
  }

  setupController(controller, model) {
    controller.set('contest', model)
  }
}
