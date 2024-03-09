import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  router: service(),
  api: service(),
  store: service(),
  isEventListenerAdded: false,
  tabSwitchTrigger: false,
  monitoredRoutes: [
    'contests.contest.attempt.content.problem',
    'contests.contest.attempt.content.quiz',
    // 'contests.contest.attempt.content.project',
  ],
  isCurrentRouteMonitored: computed('router.currentRouteName', function(){
    return this.monitoredRoutes.includes(this.router.currentRouteName)
  }),
  isTabSwitchDisabledOnContest: computed('router.currentRoute.attributes.contest', function() {
    if(this.router.currentRoute) {
      return !!this.router.get('currentRoute.attributes.contest.disallowTabSwitch')
    } else return false
  }),
  isMonitoringEnabled: computed('isCurrentRouteMonitored', 'isTabSwitchDisabledOnContest', function() {
    return this.isCurrentRouteMonitored && this.isTabSwitchDisabledOnContest
  }),
  init() {
    this._super(...arguments)
    this.tabSwitchEventHandler = this.tabSwitchEventHandler.bind(this)
    this.addObserver('isMonitoringEnabled', this, 'enableOrDisableMonitorerEvents')
    this.enableOrDisableMonitorerEvents()
  },

  clearPreviousEventListeners() {
    getEventListeners(document)
  },

  async tabSwitchEventHandler() {
    if(!document.hidden) return

    const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
    await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
      method: 'POST', 
      data: {
        fault_type: 'tab_switch'
      }
    })
    this.set('tabSwitchTrigger', true)
    await this.store.findRecord('contest-attempt', currentAttempt.id)
  },

  async setTabSwitchEvents() {
    const currentAttempt = await this.router.get('currentRoute.attributes.contest.currentAttempt')
    if(!!!currentAttempt.id) return

    document.addEventListener("visibilitychange", this.tabSwitchEventHandler);

  },
  
  async enableOrDisableMonitorerEvents() {
    if(!this.isMonitoringEnabled) {
      document.removeEventListener('visibilitychange', this.tabSwitchEventHandler)
      return this.set('isEventListenerAdded', false)
    }

    if(this.isEventListenerAdded) return 

    this.setTabSwitchEvents()
    this.set('isEventListenerAdded', true)
  }
});
