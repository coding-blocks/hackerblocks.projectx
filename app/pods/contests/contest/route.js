import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class ContestRoute extends AuthenticatedRoute {
  async model(params) {
    const contest = await this.store.queryRecord('contest', {
      custom: {
        ext: 'url',
        url: `${params.contest_id}/details`
      },
      filter: { 
        is_listed: true
      }
    })
    const contest_attempt = await this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })
    contest.set('currentAttempt', contest_attempt)

    return RSVP.hash({
      contest,
      contest_attempt
    })
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.contest.name
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      
    }
    throw err
  }
}
