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
      // (required) The name you supply for the group of objects you want to track.
      category: model.contest.contest_type,
      // (required) A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
      action: 'contest_viewed',
      // (optional) string to provide additional dimensions to the event data.
      label: model.contest.name,
      // (optional) An integer that you can use to provide numerical data about the user event.
      value: window.document.location.href
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }
}
