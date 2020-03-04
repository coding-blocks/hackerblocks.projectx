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
