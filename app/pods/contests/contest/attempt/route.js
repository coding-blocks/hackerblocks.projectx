import Route from '@ember/routing/route';
import VerifiedEmailRouteMixin from 'hackerblocks/mixins/verifiedemail-required-mixin';
const VerifiedEmailRoute = Route.extend(VerifiedEmailRouteMixin)

export default class AttemptRoute extends VerifiedEmailRoute {
  beforeModel() {
    super.beforeModel()
    const { contest } = this.modelFor('contests.contest')
    if (!contest.max_attempts) {
      this.transitionTo('contests.index')
    }
  }
}
