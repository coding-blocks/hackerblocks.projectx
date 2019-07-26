import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    const cast_contests = this.store.query('admission-contest', {
      custom: {
        ext: 'url',
        url: 'live'
      },
      filter: {
        type: 'cast'
      }
    })
    return cast_contests
  }

  setupController(controller, model) {
    controller.set('admission_contests', model)
  }
}
