import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  webengage: service(),

  activate() {
    this.webengage.trackEvent("HB: Dashboard", {})
  }
})
