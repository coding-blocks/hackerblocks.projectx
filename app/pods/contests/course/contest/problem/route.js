import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ProblemRoute extends Route {
  model(params) {
    const { contest } = this.modelFor('contests.course.contest')
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problem_id}`
      },
      contest_id: contest.get('id'),
      include: 'solution_stubs',
      reload: true
    })

    return Ember.RSVP.hash({
      contest,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.course.contest')
    }
  }
}
