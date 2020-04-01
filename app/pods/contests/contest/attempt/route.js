import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AttemptRoute extends Route {
  @service navigation;
  @service currentUser;

  async beforeModel() {
    super.beforeModel()
    const { contest } = this.modelFor('contests.contest')
    if(await contest.get('control_flags.is_verification_required')) {
      if (this.get('currentUser.user') && (!this.get('currentUser.user.email') || !this.get('currentUser.user.verifiedemail'))) {
       throw new Error('USER_EMAIL_NOT_VERIFIED')
     }
    }
    if (!contest.max_attempts) {
      return this.transitionTo('contests.index')
    }
    if (!await contest.get('currentAttempt')) {
      return this.transitionTo('contests.contest', contest.id)
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

  async afterModel(model) {
    const contents = await model.contest.get('contents')
    this.transitionTo('contests.contest.attempt.content', contents.get('firstObject.id'))
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
