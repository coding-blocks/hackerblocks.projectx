import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {

  async model() {
    const competition = this.modelFor('competitions.id')

    return RSVP.hash({
      competition
    })
  }

  setupController (controller, model) {
    controller.set('competition', model.competition)
  }
}
