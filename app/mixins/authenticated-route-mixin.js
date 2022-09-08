import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin, {
  router: service(),
  session: service(),

  beforeModel () {
    if(!this.session.isAuthenticated) {
      localStorage.setItem('redirectionPath', window.location.pathname)
      router.transitionTo('application')
    }
  }
})