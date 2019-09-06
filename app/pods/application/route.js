import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import config from 'hackerblocks/config/environment'

export default Route.extend(ApplicationRouteMixin, {
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
        localStorage.setItem('redirectionPath', null)
        window.location.href = redirectionPath
      }
    },

    sessionInvalidated () {
      window.location.replace(config.homeUrl)
    },

    async beforeModel (transition) {
      if (!isNone(transition.to.queryParams.code)) {
        if (this.get('session.isAuthenticated')) {
          return this.transitionTo('index', { queryParams: { code: undefined } })
        }
        // we have ?code qp
        const { code } = transition.to.queryParams
        
        try {
          await this.session.authenticate('authenticator:jwt', { identification: code, password: code, code })
          return this.transitionTo('index', { queryParams: { code: undefined } })
        } catch (error) {
          console.log(error)
          if (error.json.err === 'USER_EMAIL_NOT_VERIFIED') {
            this.transitionTo('error', {
              queryParams: {
                errorCode: 'USER_EMAIL_NOT_VERIFIED',
                code: undefined
              }
            })
          }
        }
      }
    },

    async model () {
      if (this.get('session.isAuthenticated')) {
        return this.currentUser.load()
      }
    },

    setupController(controller, model){
      this._super(controller, model)
      controller.set('model', model)
    }
})
