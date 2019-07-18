import Route from '@ember/routing/route';
import RSVP from 'rsvp'
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store

  model() {
    const practice = this.modelFor('practice.contest').practice
    const contest = this.modelFor('practice.contest').contest
    const level = this.modelFor('practice.contest').level
    return RSVP.hash({
      practice,
      contest,
      level
    })
  }

  setupController(controller, model) {
    controller.set('practice', model.practice)
    controller.set('contest', model.contest)
    controller.set('level', model.level)
  }
}
