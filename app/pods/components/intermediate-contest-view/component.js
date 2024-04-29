import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class IntermediateContestComponent extends Component {
  @service store
  @service currentUser
  @service monitorer

  showStartDialog = false
  envProgress=0

  @alias('contest.currentAttempt') contest_attempt
  @alias('fetchRegistrationTask.lastSuccessful.value') contestRegistration
  @alias('contest.controlFlags.show-leaderboard') showLeaderboard

  @computed('contest.contents')
  get contentCount() {
    if (this.contest) {
      if (this.contest.stats) return this.contest.stats['content-count']
      return this.get('contest').hasMany('contents').ids().length
    }
  }

  @computed('contest.disallowWindowResize', 'monitorer.isBrowserFullScreened')
  get windowResizeBlocker() {
    return this.contest.disallowWindowResize && !!!this.monitorer.isBrowserFullScreened
  }

  @computed('showStartDialog')
  get queueTimeEnd() {
    if (this.showStartDialog) {
      return moment().add(Math.floor(Math.random() * 60), 'seconds')
    }
  }

  @computed('monitorerError')
  get monitorerErrorText() {
    switch(this.monitorerError) {
      case "CAMERAACCESSDENIED": return 'Please grant camera permissions to continue with test.'
    }
  }

  didReceiveAttrs() {
    if (this.contest.acceptRegistrations) {
      this.fetchRegistrationTask.perform()
    }
  }

  @dropTask updateEnvProgress = function *() {
    this.set('envProgress', 0)
    while (this.envProgress < 50) {
      this.set('envProgress', Math.min(50, this.envProgress + 1))
      this.set('showStartDialog', true)
      yield timeout(1000)
    }
  }

  @restartableTask fetchRegistrationTask = function *() {
    return this.store.queryRecord('contest-registration', {
      custom: {
        ext: 'url',
        url: `contest/${this.contest.id}`
      }
    })
  }

  @restartableTask createAttemptTask = function *() {
    let contest_attempt
    try {
      this.updateEnvProgress.perform()
      contest_attempt = this.store.createRecord('contest-attempt', {
        contest: this.contest
      })
      yield contest_attempt.save()
      this.contest.set('currentAttempt', contest_attempt)
      this.set('showStartDialog', false)
      if (this.onAfterCreate){
        this.onAfterCreate()
      }
    } catch (err) {
      // Stop Initializing environment
      this.updateEnvProgress.cancelAll()

      // Delete In-Store contest attempt
      if (contest_attempt) {
        contest_attempt.deleteRecord()
      }

      // If error is email unverified use the callback
      const error = err.errors &&  err.errors[0]
      if (error && error.code === 405 && this.handleUnverifiedEmail) {
        return this.handleUnverifiedEmail('USER_EMAIL_NOT_VERIFIED')
      }

      // Propagate the error
      throw err
    }
  }

  @action promptCameraPermission() {
    navigator.mediaDevices.getUserMedia ({video: true},
      // successCallback
      function() {
         this.set('monitorerError', '')
      },
   
      // errorCallback
      function(err) {
        console.log(err)
      })
  }
}
