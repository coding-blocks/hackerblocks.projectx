import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';

export default Service.extend({
  router: service(),
  api: service(),
  store: service(),
  isTabSwitchEventListenerAdded: false,
  tabSwitchTrigger: false,
  windowResizeTrigger: false,
  isWindowResizeEventThrottled: false,
  isBrowserFullScreened: window.screen.availHeight === window.outerHeight && window.screen.availWidth === window.outerWidth,
  monitoredRoutes: [
    'contests.contest.attempt.content.problem',
    'contests.contest.attempt.content.quiz',
    // 'contests.contest.attempt.content.project',
  ],
  windowResizeInterval: null,
  isCurrentRouteMonitored: computed('router.currentRouteName', function(){
    return this.monitoredRoutes.includes(this.router.currentRouteName)
  }),
  isTabSwitchDisabledOnContest: computed('router.currentRoute.attributes.contest', function() {
    if(this.router.currentRoute) {
      return !!this.router.get('currentRoute.attributes.contest.disallowTabSwitch')
    } else return false
  }),
  isWindowResizeDisabledOnContest: computed('router.currentRoute.attributes.contest', function() {
    if(this.router.currentRoute) {
      return !!this.router.get('currentRoute.attributes.contest.disallowWindowResize')
    } else return false
  }),
  isMonitoringEnabled: computed('isCurrentRouteMonitored', 'isTabSwitchDisabledOnContest', 'isWindowResizeDisabledOnContest', function() {
    return this.isCurrentRouteMonitored && (this.isTabSwitchDisabledOnContest || this.isWindowResizeDisabledOnContest)
  }),
  init() {
    this._super(...arguments)
    this.tabSwitchEventHandler = this.tabSwitchEventHandler.bind(this)
    this.windowResizeEventHandler = this.windowResizeEventHandler.bind(this)
    this.windowResizeFaultReporter = this.windowResizeFaultReporter.bind(this)
    this.addObserver('isMonitoringEnabled', this, 'enableOrDisableMonitorerEvents')
    this.enableOrDisableMonitorerEvents()
  },

  setIsBrowserFullScreened() {
    this.set('isBrowserFullScreened', window.screen.availHeight <= window.outerHeight && window.screen.availWidth <= window.outerWidth)
  },

  async enableOrDisableMonitorerEvents() {
    console.log('enable monitorer')
    this.setIsBrowserFullScreened()
    
    if(!this.isMonitoringEnabled) {
      if(this.isTabSwitchEventListenerAdded) {
        document.removeEventListener('visibilitychange', this.tabSwitchEventHandler)
        this.set('isTabSwitchEventListenerAdded', false)
      }

      if(this.isWindowResizeEventListenerAdded) {
        window.removeEventListener('resize', this.windowResizeEventHandler)
        return this.set('isWindowResizeEventListenerAdded', false)
      }
      if(this.windowResizeInterval) {
        clearInterval(this.windowResizeInterval)
        this.set('windowResizeInterval', null)
      }
    }
    
    if(this.isTabSwitchDisabledOnContest && !this.isTabSwitchEventListenerAdded) {
      this.setTabSwitchEvents()
      this.set('isTabSwitchEventListenerAdded', true)
    }
    
    if(this.isWindowResizeDisabledOnContest && !this.isWindowResizeEventListenerAdded) {
      this.setWindowResizeEvents()
      this.set('isWindowResizeEventListenerAdded', true)
      later(() => {
      })
    }
  },

  clearPreviousEventListeners() {
    getEventListeners(document)
  },

  async setTabSwitchEvents() {//called based on route activation
    const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
    if(!!!currentAttempt.id) return
    
    if('webkitHidden' in document) {
      document.addEventListener("webkitvisibilitychange", this.tabSwitchEventHandler);
      console.log('webkitvisibilitychange event added')
    } else {
      document.addEventListener("visibilitychange", this.tabSwitchEventHandler);
      console.log('visibilitychange event added')
    }
  },
  
  async setWindowResizeEvents() {//called based on route activation
    const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
    if(!!!currentAttempt.id) return

    if(!this.isBrowserFullScreened) {
      if(!this.windowResizeInterval) {
        this.windowResizeFaultReporter(true)
        this.set('windowResizeInterval', setInterval(this.windowResizeFaultReporter, 10000))
      }
    }
    window.addEventListener("resize", this.windowResizeEventHandler);
  
  },

  async tabSwitchEventHandler() {
    console.log('tabSwitchEventHandler', document.hidden, document.webkitHidden)
    if(!document.hidden) return this.set('tabSwitchTrigger', true)

    const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
    await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
      method: 'POST', 
      data: {
        fault_type: 'tab_switch'
      }
    }) 
    await this.store.findRecord('contest-attempt', currentAttempt.id)
  },

  async windowResizeEventHandler() {
    if(!this.isWindowResizeEventThrottled) {
      this.set('isWindowResizeEventThrottled', true)
      if(!this.windowResizeInterval) {
        this.windowResizeFaultReporter(true)
        this.set('windowResizeInterval', setInterval(this.windowResizeFaultReporter, 10000))
      }
      //to prevent multiple event hits if user is continuously resizing
      setTimeout(() => this.set('isWindowResizeEventThrottled', false), 2500)
    }
  },

  async windowResizeFaultReporter(delayTrigger = false) {
    this.setIsBrowserFullScreened()
    if(this.isBrowserFullScreened) {
      this.set('isWindowResizeEventThrottled', false)
      if(this.windowResizeInterval) {
        clearInterval(this.windowResizeInterval)
        this.set('windowResizeInterval', null)
      }
    }
    else {
      this.set('windowResizeTrigger', true)
      const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
      await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
        method: 'POST', 
        data: {
          fault_type: 'window_resize'
        }
      }) 
      await this.store.findRecord('contest-attempt', currentAttempt.id)
    }
  },
});
