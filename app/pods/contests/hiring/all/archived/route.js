import Route from '@ember/routing/route';
export default class ArchiveContestRoute extends Route {

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
    return this.modelFor('hiring_contest')
  }

  async setupController(controller, model) {
    controller.set('hiring_contests', model)
  }
}
