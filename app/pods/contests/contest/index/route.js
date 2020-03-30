import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service metrics

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

  afterModel(model) {
    this.metrics.trackEvent({
      event: 'Contest View',
      title: model.contest.name,
      page: window.location.href
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
