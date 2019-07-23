import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  async model() {
    const { contest, contest_attempt } = this.modelFor('competitions.id.contest')

    return RSVP.hash({
      contest,
      contest_attempt
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
  }
}
