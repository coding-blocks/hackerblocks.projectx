import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ContestRoute extends Route {
  async model(params) {
    const admission_contest = await this.store.findRecord('admission-contest', params.admission_contest_id, {
      include: 'contest'
    })
    const contest_attempt = await this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: admission_contest.get('contest.id')
    })

    admission_contest.contest.set("currentAttempt", contest_attempt)
    return admission_contest
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.admission')
    }
  }
}
