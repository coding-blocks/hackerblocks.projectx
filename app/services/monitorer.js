import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  router: service(),
  api: service(),
  store: service(),
  tabSwitchTrigger: false,
  noFaceTrigger: false,
  multipleFacesTrigger: false,
  windowResizeTrigger: false,
  faultTrigger: false,
  noFaceThrottled: false,
  multipleFacesThrottled: false,
  oneFaceDetected: false,
  multipleFacesDetected: false,
  isMonitorerFaultEventHandlerAdded: false,
  failureRedirect: null,
  isLifeFeedEnabled: false,
  faultMessages: {
    tabSwitch: false,
    noFace: false,
    multipleFaces: false,
    windowResize: false,
    noise: false
  },
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

    if(this.contest.disallowNoFace || contest.disallowTabSwitch || contest.disallowWindowResize || contest.disallowMultipleFaces) {
      await this.enableRightClickMonitorer()
      await this.enableKeyboardMonitorer({ console: true })
    }

    if(this.contest.disallowTabSwitch) {
      await this.enableTabSwitchMonitorer()
    }

    if(this.contest.disallowWindowResize) {
      await this.enableWindowResizeMonitorer()
    }

    if(this.contest.disallowNoFace) {
      await this.enableNoFaceMonitorer()
    }

    if(this.contest.disallowMultipleFaces) {
      await this.enableMultipleFacesMonitorer()
    }

    if(this.contest.disallowNoise) {
      await this.enableNoiseMonitorer({ volume: 3 })
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
    if(!this.isLiveFeedEnabled) {
      await this.monitorer.enable({ liveFeed: true })
      this.set('isLifeFeedEnabled', true)
    }
  },

  async enableMultipleFacesMonitorer() {
    await this.monitorer.enable({ multipleFaces: true })
    if(!this.isLiveFeedEnabled) {
      await this.monitorer.enable({ liveFeed: true })
      this.set('isLifeFeedEnabled', true)
    }
  },

  async enableRightClickMonitorer() {
    await this.monitorer.enable({ rightClick: true })
  },

  async enableKeyboardMonitorer(options) {
    await this.monitorer.enable({ keyboard: options })
  },

  async enableNoiseMonitorer(options) {
    await this.monitorer.enable({ noise: options })
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

  async disableMultipleFacesMonitorer() {
    await this.monitorer.disable({ multipleFaces: true })
    await this.monitorer.disable({ liveFeed: true })
  },

  async disableRightClickMonitorer() {
    await this.monitorer.disable({ rightClick: true })
  },

  async disableKeyboardMonitorer(options) {
    await this.monitorer.disable({ keyboard: true })
  },

  resetFaultMessages() {
    this.set('faultMessages', {
      tabSwitch: false,
      windowResize: false,
      noFace: false,
      multipleFace: false
    })
    this.set('faultTrigger', false)
  },
  
  async monitorerFaultEventHandler(e) {
    const currentAttempt = await this.contest.currentAttempt
    if(!!!currentAttempt.id) return
    
    switch(e.detail.code) {
      case "TAB_SWITCHED":  await this.handleTabSwitchFault(); break;
      case "WINDOW_RESIZED":  await this.handleWindowResizeFault(e.detail); break;
      case "NO_FACE_DETECTED":  await this.handleNoFaceFault(e.detail); 
                                this.set('oneFaceDetected', false); break;
      case "MULTIPLE_FACES_DETECTED":  await this.handleMultipleFacesFault(e.detail); 
                                this.set('oneFaceDetected', false); break;
      case "NOISE_DETECTED": await this.handleNoiseFault(); break;
    }
  },

  async monitorerErrorEventHandler(e) {
    if(this.onError) {
      this.onError(e.detail)
    }
  },

  async monitorerSuccessEventHandler(e) {
    switch(e.detail.code) {
      case "ONEFACEDETECTED": this.set('oneFaceDetected', true); break;
    }
  },

  async handleTabSwitchFault() {
    // if(!document.hidden) return this.set('tabSwitchTrigger', true)
    if(!document.hidden) {
      this.set('faultMessages.tabSwitch', true)
      return this.set('faultTrigger', true)
    }


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
      // this.set('windowResizeTrigger', true)
      this.set('faultMessages.windowResize', true)
      this.set('faultTrigger', true)

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

      // this.set('noFaceTrigger', true)
      this.set('faultMessages.noFace', true)
      this.set('faultTrigger', true)

      
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
  },

  async handleMultipleFacesFault(details) {
    if(!this.multipleFacesThrottled) {
      this.set('multipleFacesThrottled', true)
      setTimeout(() => this.set('multipleFacesThrottled', false), 5000)

      // this.set('noFaceTrigger', true)
      this.set('faultMessages.multipleFaces', true)
      this.set('faultTrigger', true)

      
      const currentAttempt = await this.contest.currentAttempt
      const imgFileArray = new Uint8Array(await details.imageBlob.arrayBuffer())

      await this.api.request(`/contest-attempts/${currentAttempt.id}/report-monitorer-fault`, {
        method: 'POST', 
        data: {
          fault_type: 'multiple_faces',
          image_file_array: imgFileArray
        }
      }) 
      await this.store.findRecord('contest-attempt', currentAttempt.id)
    }
  },

  async handleNoiseFault() {
    this.set('faultMessages.noise', true)
    this.set('faultTrigger', true)
  }
});
