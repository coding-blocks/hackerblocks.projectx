import Route from '@ember/routing/route';
import VerifiedEmailRouteMixin from 'hackerblocks/mixins/verifiedemail-required-mixin';
import { inject as service } from '@ember/service';
const VerifiedEmailRoute = Route.extend(VerifiedEmailRouteMixin)

export default class AttemptRoute extends VerifiedEmailRoute {
  @service navigation;

  beforeModel() {
    super.beforeModel()
    const { contest } = this.modelFor('contests.contest')
    if (!contest.max_attempts) {
      this.transitionTo('contests.index')
    }
  }

  model() {
    return this.modelFor('contests.contest')
  }

  afterModel(model) {
    const problem_id = model.contest.hasMany('problems').ids()[0]
    if (problem_id) {
      return this.transitionTo('contests.contest.attempt.problem', problem_id)
    } else {
      const quiz_id = model.contest.hasMany('quizzes').ids()[0]
      return this.transitionTo('contests.contest.attempt.quiz', quiz_id)
    }
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
  }

  activate() {
    this.navigation.setVisibility(false)
  }

  deactivate() {
    this.navigation.setVisibility(true)
  }
}
