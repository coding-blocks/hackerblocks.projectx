import Route from '@ember/routing/route';
import VerifiedEmailRouteMixin from 'hackerblocks/mixins/verifiedemail-required-mixin';
import { inject as service } from '@ember/service';
const VerifiedEmailRoute = Route.extend(VerifiedEmailRouteMixin)

export default class AttemptRoute extends VerifiedEmailRoute {
  @service navigation;

  async beforeModel() {
    super.beforeModel()
    const { contest } = this.modelFor('contests.contest')
    if (!contest.max_attempts) {
      this.transitionTo('contests.index')
    }
    if (!await contest.get('currentAttempt')) {
      this.transitionTo('contests.contest', contest.id)
    }
  }

  async model() {
    const model = this.modelFor('contests.contest')
    await this.store.query('progress', {
      filter: {
        contest_attempt_id: model.contest.get('currentAttempt.id')
      }
    })
    return model
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
