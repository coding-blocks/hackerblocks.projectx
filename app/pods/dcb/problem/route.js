import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';

const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)
export default class ProblemRoute extends AuthenticatedRoute {
  model(params) {
    const { contest, dcb } = this.modelFor('dcb')
    const content = this.store.queryRecord('content', {
      custom: {
        ext: 'url',
        url: `${params.content_id}`
      },
      contest_id: contest.id,
      include: 'problem'
    })
    return RSVP.hash({
      contest,
      content,
      dcb
    })
  }

  afterModel(model) {
    if (model.content.type !== 'problem') {
      this.transitionTo('404')
    }
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
    controller.set('dcb', model.dcb)
  }
}
