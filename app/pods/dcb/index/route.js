import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class DCBIndexRoute extends Route {
  @service api

  model() {
    const contest = this.modelFor('dcb')
    const top_problem = this.api.request(`dcbs/${contest.id}/top_problem`)
    return RSVP.hash({
      contest,
      top_problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('top_problem', model.top_problem)
  }
}
