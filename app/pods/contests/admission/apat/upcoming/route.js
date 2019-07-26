import Route from '@ember/routing/route';

export default class UpcomingRoute extends Route {
  model() {
    const cast_contests = this.store.query('admission-contest', {
      custom: {
        ext: 'url',
        url: 'upcoming'
      },
      filter: {
        type: 'apat'
      }
    })
    return cast_contests
  }

  setupController(controller, model) {
    controller.set('admission_contests', model)
  }
}
