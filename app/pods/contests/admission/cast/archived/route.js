import Route from '@ember/routing/route';

export default class ArchivedRoute extends Route {
  model() {
    const cast_contests = this.store.query('admission-contest', {
      custom: {
        ext: 'url',
        url: 'archived'
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
