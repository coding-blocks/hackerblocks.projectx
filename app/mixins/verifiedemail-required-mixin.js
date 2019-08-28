import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin,{
  currentUser: service(),
  beforeModel() {
    if (this.get('currentUser.user') && (!this.get('currentUser.user.email') || !this.get('currentUser.user.verifiedemail'))) {
      return this.transitionTo('error', {
        queryParams: {
          errorCode: 'USER_EMAIL_NOT_VERIFIED'
        }
      })
    }
    return this._super(...arguments)
  }
});
