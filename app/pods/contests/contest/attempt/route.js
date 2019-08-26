import Route from '@ember/routing/route';

export default class AttemptRoute extends Route {
  beforeModel() {
    const { contest } = this.modelFor('contests.contest')
    if (!contest.max_attempts) {
      this.transitionTo('contests.index')
    }
  }
}
