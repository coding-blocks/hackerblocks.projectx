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
    },
    q: {
      refreshModel: false
    }
  }

  beforeModel() {
    const { contest } = this.modelFor('contests.contest')
    if (contest.max_attempts) {
      this.transitionTo('contests.contest.attempt')
    }
  }

  model() {
    return this.modelFor('contests.contest')
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
