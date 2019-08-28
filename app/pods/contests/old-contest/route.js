import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)
export default class OldContest extends AuthenticatedRoute {
  beforeModel() {
    const { contest_id } = this.paramsFor('contests.old-contest')
    this.transitionTo('contests.contest', contest_id)
  }
}
