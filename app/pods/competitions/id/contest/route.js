import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)

export default class ContestRoute extends AuthenticatedRoute {
  async model(params) {
    const contest = await this.store.findRecord('contest', params.contest_id)
    const contest_attempt = this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })

    return RSVP.hash({
      contest,
      contest_attempt
    })
  }

  setupController(controller, model){
    controller.set('contest', model.contest)
    model.contest.set("currentAttempt", model.contest_attempt)
    this.set('breadCrumb', {
      title: model.contest.name
    })
  }
}
