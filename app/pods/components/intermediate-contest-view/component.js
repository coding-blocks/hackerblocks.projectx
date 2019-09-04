import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class IntermediateContestComponent extends Component {
  @service store
  @service currentUser

  showStartDialog = false
  envProgress=0

  @alias('contest.currentAttempt')
  contest_attempt

  @computed('contest.problems')
  get problemCount() {
    if (this.contest) {
      if (this.contest.stats) return this.contest.stats.problemcount
      return this.get('contest').hasMany('problems').ids().length
    }
  }

  @computed('showStartDialog')
  get queueTimeEnd() {
    if (this.showStartDialog) {
      return moment().add(Math.floor(Math.random() * 60), 'seconds')
    }
  }

  @computed('contest.quizzes')
  get quizCount() {
    if (this.contest) {
      return this.get('contest').hasMany('quizzes').ids().length
    }
  }

  @dropTask updateEnvProgress = function *() {
    while (this.envProgress < 60) {
      this.set('envProgress', Math.min(60, this.envProgress + 1))
      yield timeout(1000)
    }
  }

  @restartableTask createAttemptTask = function *() {
    const contest_attempt = this.store.createRecord('contest-attempt', {
      contest: this.contest
    })
    try {
      this.updateEnvProgress.perform()
      yield timeout(Math.floor(Math.random() * 30000))
      yield contest_attempt.save()
      yield timeout(Math.floor(Math.random() * 30000))
      this.contest.set('currentAttempt', contest_attempt)
      this.set('showStartDialog', false)
      if (this.onAfterCreate){
        this.onAfterCreate()
      }
    } catch (err) {
      const error = err.errors[0]
      if (error.code === 405 && this.handleUnverifiedEmail) {
        return this.handleUnverifiedEmail('USER_EMAIL_NOT_VERIFIED')
      }
      contest_attempt.deleteRecord()
      throw err
    }
  }
}
