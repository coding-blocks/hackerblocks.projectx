import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  model() {
    const admission_contest = this.modelFor('contests.admission.contest')
    return RSVP.hash({
      admission_contest,
      contest: admission_contest.contest
    })
  }

  setupController(controller, model) {
    controller.set('admission_contest', model.admission_contest)
    controller.set('contest', model.contest)
  }
}
