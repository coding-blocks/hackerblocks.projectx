import Route from '@ember/routing/route';

export default class LiveContestRoute extends Route {
  model() {
    return this.store.query('college_contest', {
      custom: {
        ext: 'url', url: 'live'
      }
    })
  }

  setupController(controller, model) {
    controller.set('college_contests', model)
  }
}
