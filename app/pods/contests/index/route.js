import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    limit: 20,
    offset: 0
  }

  model() {
    return this.store.query('contest', {
      custom: {
        ext: 'url',
        url: 'public'
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }

  setupController(controller, model) {
    controller.set('contests', model)
  }
}
