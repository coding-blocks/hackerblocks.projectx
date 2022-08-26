import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin, {
  router: service(),
  session: service(),

  beforeModel () {
    localStorage.setItem('redirectionPath', window.location.pathname)

    if(!this.session.isAuthenticated) {
      router.transitionTo('application')
    }
  }
})