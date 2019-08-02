import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class DashboardDcbCard extends Component {
  @service api
  @service store

  @alias('fetchDcbTopProblemTask.lastSuccessful.value') topProblem
  @alias('fetchLevelTask.lastSuccessful.value') level
  dcb_id = 1

  @computed('level')
  get progress() {
    return (this.level.perfectSubmissionCount / this.level.nextRequiredSubmissionCount)*100
  }

  didReceiveAttrs() {
    this.fetchDcbTopProblemTask.perform()
    this.fetchLevelTask.perform()
  }

  @restartableTask fetchDcbTopProblemTask = function *() {
    const problem = yield this.api.request(`dcbs/${this.dcb_id}/top-problem`, {
      method: 'GET'
    })
    this.store.pushPayload(problem)
    return this.store.peekRecord('problem', problem.data.id)
  }

  @restartableTask fetchLevelTask = function *() {
    const levels = yield this.store.query('user_level', {
      filter: {
        contestId: 1
      }
    })
    return levels.toArray()[0]
  }
}
