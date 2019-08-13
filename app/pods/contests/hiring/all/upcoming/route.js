import Route from '@ember/routing/route';

export default class UpcomingRoute extends Route {
  model() {
    return this.store.query('hiring-contest', {
      custom: {
        ext: 'url', url: 'upcoming'
      }
    })
  }

  setupController(controller, model) {
    controller.set('hiring_contests', model)
  }
}
