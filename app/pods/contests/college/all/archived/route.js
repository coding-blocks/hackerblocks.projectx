import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class ArchiveContestRoute extends Route {
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
    return this.modelFor('college_contest')
  }

  async setupController(controller, model) {
    controller.set('college_contests', model)
  }
}
