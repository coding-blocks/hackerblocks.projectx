import Route from '@ember/routing/route';
import UTMCookieRouteMixin from 'hackerblocks/mixins/utm-cookie-route-mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import config from 'hackerblocks/config/environment';
import moment from 'moment';

export default Route.extend(UTMCookieRouteMixin, {
    session: service(),
    currentUser: service(),
    queryParams: {
        code: {
            refreshModel: true
        }
    },

    sessionAuthenticated () {
      const redirectionPath = localStorage.getItem('redirectionPath')
      if (!isNone(redirectionPath)) {
        localStorage.removeItem('redirectionPath')
        window.location.href = redirectionPath
      }
    },

    sessionInvalidated () {
      window.location.replace(config.homeUrl)
    },

    async beforeModel (transition) {
      this._super(...arguments)
      
      if(!this.session.isAuthenticated) {
        const app_flow = localStorage.getItem('app_flow')
        localStorage.removeItem('app_flow')
        if(app_flow !== 'logout') {
          localStorage.setItem('loginPrompt', true)
        }

        localStorage.setItem('redirectionPath', window.location.pathname)
        window.location.href = config.nuxtPublicUrl
      }
      
    },

    async model () {
      if (this.get('session.isAuthenticated')) {
        await this.currentUser.load()
        if(!this.currentUser.user.verifiedmobile) {
          document.cookie = `cb_redirect=${config.publicUrl}; expires=${moment().add(1, 'hours').toDate()}; path=/; Secure`
          window.location = config.oneauthURL + '/users/me/edit?flow=verify_user_details'
        } else {
          document.cookie = `cb_redirect=${config.publicUrl}; expires=${moment().subtract(3, 'days').toDate()}`
        }
      }
    },

    setupController(controller, model){
      this._super(controller, model)
      controller.set('model', model)
    }
})
