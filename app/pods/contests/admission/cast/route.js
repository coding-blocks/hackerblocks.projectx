import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    const cast_contests = this.store.query('admission-contest', {
      filter: {
        type: 'cast'
      },
      include: 'contest',
      exclude: 'contest.*'
    })
    return cast_contests
  }

  setupController(controller, model) {
    controller.set('admission_contests', model)
  }
}
