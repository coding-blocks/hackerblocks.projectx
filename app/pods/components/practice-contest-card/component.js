import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class PracticeContestCard extends Component {
  @service store
  @alias('fetchLevelTask.lastSuccessful.value') currentLevel

  didReceiveAttrs() {
    this.fetchLevelTask.perform()
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
}
