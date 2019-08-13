import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  async model(params) {
    const contest = await this.modelFor('contests.hiring.contest').contest
    const contest_attempt = contest.get('currentAttempt')
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problem_id}`
      },
      contest_id: contest.id,
      include: 'solution_stubs'
    })

    return RSVP.hash({
      contest,
      contest_attempt,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
    controller.set('problem', model.problem)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.hiring.contest')
    }
  }
}
