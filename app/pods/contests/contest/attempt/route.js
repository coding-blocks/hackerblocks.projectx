import Route from '@ember/routing/route';
import VerifiedEmailRouteMixin from 'hackerblocks/mixins/verifiedemail-required-mixin';
import { inject as service } from '@ember/service';
const VerifiedEmailRoute = Route.extend(VerifiedEmailRouteMixin)

export default class AttemptRoute extends VerifiedEmailRoute {
  @service navigation;

  async beforeModel() {
    super.beforeModel()
    const { contest, contest_attempt } = this.modelFor('contests.contest')
    if (!contest.max_attempts) {
      this.transitionTo('contests.index')
    }
    if (!contest_attempt) {
      this.transitionTo('contests.contest', contest.id)
    }
  }

  model() {
    return this.modelFor('contests.contest')
  }

  afterModel(model, transition) {
    if (transition.targetName === 'contests.contest.attempt.index') {
      const problem_id = model.contest.hasMany('problems').ids()[0]
      if (problem_id) {
        return this.transitionTo('contests.contest.attempt.problem', problem_id)
      } else {
        const quiz_id = model.contest.hasMany('quizzes').ids()[0]
        return this.transitionTo('contests.contest.attempt.quiz', quiz_id)
      }
    }
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
  }

  activate() {
    this.navigation.setVisibility(false)
  }

  deactivate() {
    this.navigation.setVisibility(true)
  }
}
