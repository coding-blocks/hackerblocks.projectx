import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class UpcomingContestRoute extends Route {
  @service metrics

  queryParams = {
    offset: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    }
  }

  model() {
    return this.modelFor('college_contest')
  }

  async setupController(controller, model) {
    controller.set('college_contests', model)
  }
}
