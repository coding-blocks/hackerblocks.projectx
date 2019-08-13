import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  async model(params) {
    const { hiring_contest_id } = params
    const hiring_contest = await this.store.findRecord('hiring-contest', hiring_contest_id, {
      include: 'contest',
      reload: true
    })

    const contest = await hiring_contest.contest

    const contest_attempt = this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })


    return RSVP.hash({
      hiring_contest,
      contest,
      contest_attempt
    })
  }

  afterModel(model) {
    model.contest.set("currentAttempt", model.contest_attempt)
    this.set('breadCrumb', {
      title: model.hiring_contest.name
    })
  }
}
