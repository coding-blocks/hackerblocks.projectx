import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LiveContestRoute extends Route {
  @service metrics

  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    },
    q: {
      refreshModel: false
    }
  }

  model() {
    return this.modelFor('admission-contest')
  }

  async setupController(controller, model) {
    controller.set('admission_contests', model)
  }
}
