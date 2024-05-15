import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class AttemptController extends Controller{
  @service api
  @service monitorer
  @service router

  isMonitorerSet = false

  init() {
    this._super(...arguments)

    this.setupMonitorer = this.setupMonitorer.bind(this)
  }

  async setupMonitorer() {
    if(this.isMonitorerSet) return

    await this.monitorer.setup({
      contest: this.contest,
      onError: this.onMonitorerError.bind(this)
    })

    this.set('isMonitorerSet', true)
  }
  
  async onMonitorerError(detail) {
    await this.monitorer.disable()
    this.set('isMonitorerSet', false)
    
    switch(detail.code) {
      case "ACCESS_DENIED": 
          this.transitionToRoute('contests.contest', this.contest.id, {
            queryParams: {
              monitorerError: detail.code
            }
          })
          break;
      case "CAMERAACCESSDENIED": 
          this.transitionToRoute('contests.contest', this.contest.id, {
            queryParams: {
              monitorerError: detail.code
            }
          })
          break;
    }
  }

  @dropTask submitTask = function* () {
    later(() => {
      return this.api.request(`contest-attempts/${this.contest.get('currentAttempt.id')}/submit`, {
        method: 'POST'
      })
    }, Math.floor(Math.random() * 15) * 1000)
    this.transitionToRoute('contests.contest.feedback')
  }

  @action onTimerEnd() {
    this.transitionToRoute('contests.contest.feedback')
  }
}
