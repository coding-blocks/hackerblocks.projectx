import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ContestRoute extends Route {
  async model(params) {
    const contest = await this.store.findRecord('contest', params.contest_id)
    const contest_attempt = await this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })

    contest.set("currentAttempt", contest_attempt)

    return contest
    // return RSVP.hash({
    //   contest,
    //   contest_attempt
    // })
  }
  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    })
  }
}
