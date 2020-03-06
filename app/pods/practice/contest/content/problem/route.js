import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProblemRoute extends Route {
  model() {
    const { contest } = this.modelFor('practice.contest')
    const { content } = this.modelFor('practice.contest.content')
    const problem = content.get('problem')

    return hash({
      contest,
      content,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
    controller.set('problem', model.problem)
  }
}
