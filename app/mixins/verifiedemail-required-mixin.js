import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin,{
  currentUser: service(),
  router: service(),
  beforeModel() {
    if (this.get('currentUser.user') && (!this.get('currentUser.user.email') || !this.get('currentUser.user.verifiedemail'))) {
      throw new Error('USER_EMAIL_NOT_VERIFIED')
    }
    return this._super(...arguments)
  },
  actions: {
    error(err) {
      if (err.errors[0].status == 405) {
        this.transitionTo('error', {
          queryParams: {
            errorCode: 'USER_EMAIL_NOT_VERIFIED',
            next: this.router.get('currentURL')
          }
        })
      }
      throw err
    }
  }
});
