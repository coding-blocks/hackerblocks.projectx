import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class PracticeContestCard extends Component {
  @service store
  @service api
  @alias('fetchLevelTask.lastSuccessful.value') currentLevel

  didReceiveAttrs() {
    this.fetchLevelTask.perform()
    if(this.showProblem){
      this.fetchNextProblemTask.perform()
    }
  }

  @computed('currentLevel')
  get progress() {
    return (this.currentLevel.perfectSubmissionCount / this.currentLevel.nextRequiredSubmissionCount)*100
  }

  @restartableTask fetchLevelTask = function *() {
    const levels = yield this.store.query('user_level', {
      filter: {
        contestId: this.practice.belongsTo('contest').id()
      }
    })
    return levels.toArray()[0]
  }

  @restartableTask fetchNextProblemTask = function *() {
    const payload = yield this.api.request(`practices/${this.practice.id}/next_problem`, {
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        filter: {
          contest_id: this.practice.belongsTo('contest').id() 
        }
      }  
    })
    
    this.store.pushPayload(payload)
    const problem = this.store.peekRecord('problem', payload.data.id)
    this.set('problem', problem)
  }
}
