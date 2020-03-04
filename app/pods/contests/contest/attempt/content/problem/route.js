import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  async model(params) {
    const { contest } = this.modelFor('contests.contest')
    const content = this.modelFor('contests.contest.attempt.content')
    const problem = content.get('problem')

    return RSVP.hash({
      contest,
      contest_attempt: contest.get('currentAttempt'),
      content,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
    controller.set('content', model.content)
    controller.set('problem', model.problem)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.contest')
    }
  }
}
