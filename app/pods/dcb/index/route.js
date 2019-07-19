import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class DCBIndexRoute extends Route {
  @service api

  model() {
    const contest = this.modelFor('dcb').contest
    const level = this.modelFor('dcb').level
    const problems = this.modelFor('dcb').problems
    return RSVP.hash({
      contest,
      problems,
      level
    })
  }

  setupController(controller, model) {
    controller.set('dcb', model.contest.dcb)
    controller.set('contest', model.contest)
    controller.set('problems', model.problems)
    controller.set('level', model.level)
  }
}
