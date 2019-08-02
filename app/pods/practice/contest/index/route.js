import Route from '@ember/routing/route';
import RSVP from 'rsvp'

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
    }
  }

  model() {
    const practice = this.modelFor('practice.contest').practice
    return RSVP.hash({
      practice,
      contest: practice.contest
    })
  }

  setupController(controller, model) {
    controller.set('practice', model.practice)
    controller.set('contest', model.contest)
  }
}
