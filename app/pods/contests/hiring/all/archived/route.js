import Route from '@ember/routing/route';

export default class ArchivedRoute extends Route {
  model() {
    return this.store.query('hiring-contest', {
      custom: {
        ext: 'url', url: 'archived'
      }
    })
  }

  setupController(controller, model) {
    controller.set('hiring_contests', model)
  }
}
