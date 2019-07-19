import Route from '@ember/routing/route';
import RSVP from 'rsvp'
import { inject as service } from '@ember/service';

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

  @service store

  model() {
    const practice = this.modelFor('practice.contest').practice
    const level = this.modelFor('practice.contest').level
    
    return RSVP.hash({
      practice,
      contest: practice.contest,
      level
    })
  }

  setupController(controller, model) {
    controller.set('practice', model.practice)
    controller.set('contest', model.contest)
    controller.set('level', model.level)
  }
}
