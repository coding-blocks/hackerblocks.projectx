import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)
export default class OldContest extends AuthenticatedRoute {
  model(params) {
    return this.store.findRecord('contest', params.contest_id)
  }
  
  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    })
  }
}
