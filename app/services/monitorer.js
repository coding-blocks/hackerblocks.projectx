import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
// import Monitorer from '@coding-blocks/monitorer';

export default Service.extend({
  router: service(),
  api: service(),
  store: service(),
  tabSwitchTrigger: false,
  noFaceTrigger: false,
  windowResizeTrigger: false,
  noFaceThrottled: false,
  noFaceDetected: false,
  isMonitorerFaultEventHandlerAdded: false,
  failureRedirect: null,
  init() {
    this._super(...arguments)
    this.monitorerFaultEventHandler = this.monitorerFaultEventHandler.bind(this)
    this.monitorerErrorEventHandler = this.monitorerErrorEventHandler.bind(this)
    this.monitorerSuccessEventHandler = this.monitorerSuccessEventHandler.bind(this)
  },

  async setup(options) {
    if(!this.monitorer) {
      this.set('monitorer', new Monitorer())
    }

    this.set('contest', options.contest)
    this.set('onError', options.onError)

    if(!this.isMonitorerFaultEventHandlerAdded) {
      window.addEventListener('monitorerfault', this.monitorerFaultEventHandler)
      window.addEventListener('monitorererror', this.monitorerErrorEventHandler)
      window.addEventListener('monitorersuccess', this.monitorerSuccessEventHandler)
    }


    if(this.contest.disallowTabSwitch) {
      await this.enableTabSwitchMonitorer()
    }

    if(this.contest.disallowWindowResize) {
      await this.enableWindowResizeMonitorer()
    }

    if(this.contest.disallowNoFace) {
      await this.enableNoFaceMonitorer({ noFace: true })
    }
  },

  async disable() {
    this.set('contest', null)
    this.set('onError', null)

    await this.disableTabSwitchMonitorer()
    await this.disableWindowResizeMonitorer()
    await this.disableNoFaceMonitorer()

    window.removeEventListener('monitorerfault', this.monitorerFaultEventHandler)
  },

  async enableTabSwitchMonitorer() {
    await this.monitorer.enable({ tabSwitch: true })
  },

  async enableWindowResizeMonitorer() {
    await this.monitorer.enable({ windowResize: true })
  },

  async enableNoFaceMonitorer() {
    await this.monitorer.enable({ noFace: true })
    await this.monitorer.enable({ liveFeed: true })
  },
  
  async disableTabSwitchMonitorer() {
    await this.monitorer.disable({ tabSwitch: true })
  },

  async disableWindowResizeMonitorer() {
    await this.monitorer.disable({ windowResize: true })
  },

  async disableNoFaceMonitorer() {
    await this.monitorer.disable({ noFace: true })
    await this.monitorer.disable({ liveFeed: true })
  },

  async monitorerFaultEventHandler(e) {
    const currentAttempt = await this.contest.currentAttempt
    if(!!!currentAttempt.id) return
    
    switch(e.detail.code) {
      case "TAB_SWITCHED":  await this.handleTabSwitchFault(); break;
      case "WINDOW_RESIZED":  await this.handleWindowResizeFault(e.detail); break;
      case "NO_FACE_DETECTED":  await this.handleNoFaceFault(e.detail); 
                                this.set('noFaceDetected', true); break;
    }
  },

  async monitorerErrorEventHandler(e) {
    if(this.onError) {
      this.onError(e.detail)
    }
  },

  async monitorerSuccessEventHandler(e) {
    switch(e.detail.code) {
      case "ONEFACEDETECTED": this.set('noFaceDetected', false); break;
    }
  },

  async handleTabSwitchFault() {
    if(!document.hidden) return this.set('tabSwitchTrigger', true)

    const currentAttempt = await this.contest.currentAttempt
    await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
      method: 'POST', 
      data: {
        fault_type: 'tab_switch'
      }
    }) 
    await this.store.findRecord('contest-attempt', currentAttempt.id)
  },

  async handleWindowResizeFault(details) {
    if(details.message === 'browser_unfullscreened') {
      this.set('windowResizeTrigger', true)

      const currentAttempt = await this.contest.currentAttempt
      await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
        method: 'POST', 
        data: {
          fault_type: 'window_resize'
        }
      }) 
      await this.store.findRecord('contest-attempt', currentAttempt.id)
    }
  },

  async handleNoFaceFault(details) {
    if(!this.noFaceThrottled) {
      this.set('noFaceThrottled', true)
      setTimeout(() => this.set('noFaceThrottled', false), 5000)

      this.set('noFaceTrigger', true)
      
      const currentAttempt = await this.contest.currentAttempt
      const imgFileArray = new Uint8Array(await details.imageBlob.arrayBuffer())

      await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
        method: 'POST', 
        data: {
          fault_type: 'no_face',
          image_file_array: imgFileArray
        }
      }) 
      await this.store.findRecord('contest-attempt', currentAttempt.id)
    }
  }
});
