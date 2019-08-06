import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IdRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    }
  }

  async model(params) {
    return this.modelFor('contests.college.contest')
  }

  setupController(controller, model) {
    controller.set('college_contest', model.college_contest)
    controller.set('contest', model.contest)
  }
}
