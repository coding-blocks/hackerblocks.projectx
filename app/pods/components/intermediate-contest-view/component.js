import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import moment from 'moment';
import ENV from 'hackerblocks/config/environment';

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
      case "CAMERAACCESSDENIED": return 'Please grant camera and mic permissions to continue with test.'
      case "ACCESS_DENIED": return 'Please grant camera and mic permissions to continue with test.'
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
      const cb_auth = this.getCookieValue('cb_auth')
      const contestId=this.contest.id
      const contentId="1"
      if(this.contest.environment){
        // Open Electron App
        const electronURL = `electron-app://contest?cb_auth=${encodeURIComponent(cb_auth || "")}&contestId=${contestId}&contentId=${contentId}`;
        window.location.href = electronURL;
      }else{
        //open in browser
        if (this.onAfterCreate){
         this.onAfterCreate()
       }
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

    getCookieValue(name) {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const cookie = cookies.find(c => c.startsWith(`${name}=`));
       return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
     }
  @action promptCameraPermission() {
    navigator.mediaDevices.getUserMedia ({video: true, mic: true},
      // successCallback
      function() {
         this.set('monitorerError', '')
      },
 
      // errorCallback
      function(err) {
        console.log(err)
      })
  }

  @action async openTestInNewWindow() {
    const cb_auth = this.getCookieValue('cb_auth')

    const contestId=this.contest.id
    const progresses = this.contest.get('currentAttempt.progresses');
    const progressProblemHash = {};
    progresses.forEach(progress => {
        progressProblemHash[progress.belongsTo('content').id()] = progress;
    });
console.log('contents',this.contest.contents)
    const contentWithProgress = this.get('contest.contents').map(content => {
        return {
            content,
            contentId: content.get('id'),
            progress: progressProblemHash[content.get('id')]
        };
    });
    console.log('contentWithProgress', contentWithProgress)
 
    const contentId = contentWithProgress.length > 0 ? contentWithProgress[0].contentId : null;

    if (!contentId) {
        console.error('No contentId found for the contest.');
        return;
    }
    
    console.log('contentId', contentId)
    if(this.contest.environment){
      // Open Electron App
      const electronURL = `electron-app://contest?cb_auth=${encodeURIComponent(cb_auth || "")}&contestId=${contestId}&contentId=${contentId}`;
       window.location.href = electronURL;
    }else{
      //open in browser
      window.open(`${ENV.publicUrl}/contests/${this.contest.id}/attempt/`, `hackerblocks-contest-${this.contest.id}`, `menubar=1,resizable=0,height=${window.screen.availHeight},width=${window.screen.availWidth},top=0,left=0`)
    }

  }
}
