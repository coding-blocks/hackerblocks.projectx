import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class ContestRoute extends Route {
  async model(params) {
    const contest = await this.store.findRecord('contest', params.contest_id)
    const contest_attempt = await this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })
    contest.set('currentAttempt', contest_attempt)

    return RSVP.hash({
      contest,
      contest_attempt
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      debugger
    }
    throw err
  }
}
