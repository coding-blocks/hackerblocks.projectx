import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    },
    difficulty: {
      refreshModel: true
    },
    status: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  }

  model() {
    return this.modelFor('contests.contest')
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
