import Route from '@ember/routing/route';

export default class UpcomingContestRoute extends Route {
  model() {
    return this.store.query('college_contest', {
      custom: {
        ext: 'url', url: 'upcoming'
      }
    })
  }

  async setupController(controller, model) {
    controller.set('contests', model)
  }
}
