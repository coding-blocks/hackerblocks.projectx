import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)

export default class ContestRoute extends AuthenticatedRoute {
  async model(params) {
    const practice = await this.store.findRecord('practice', params.practice_id, {
      include: 'tags'
    })
    const contest = await practice.get('contest')
    return RSVP.hash({
      practice,
      contest
    })
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.practice.name
    })
  }
}
