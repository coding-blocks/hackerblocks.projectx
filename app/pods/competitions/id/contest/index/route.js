import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  async model() {
    const contest = this.modelFor('competitions.id.contest')
    return contest
  }

  setupController(controller, model) {
    controller.set('contest', model)
  }
}
