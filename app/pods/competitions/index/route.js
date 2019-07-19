import Route from '@ember/routing/route';

export default class CompetitionRoute extends Route {
  model () {
    return this.store.findAll('competition');
  }

  setupController(controller, model) {
    controller.set('competitions', model)
  }
}
