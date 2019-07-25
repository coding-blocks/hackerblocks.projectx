import Route from '@ember/routing/route';

export default class ArchiveContestRoute extends Route {
  model() {
    return this.store.query('college_contest', {
      custom: {
        ext: 'url', url: 'archived'
      }
    })
  }

  async setupController(controller, model) {
    controller.set('college_contests', model)
  }
}
