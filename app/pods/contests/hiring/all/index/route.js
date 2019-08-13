import Route from '@ember/routing/route';

export default class LiveRoute extends Route {
  model() {
    return this.store.query('hiring-contest', {
      custom: {
        ext: 'url', url: 'live'
      }
    })
  }

  setupController(controller, model) {
    controller.set('hiring_contests', model)
  }
}
