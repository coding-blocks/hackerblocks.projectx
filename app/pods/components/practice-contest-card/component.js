import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class PracticeContestCard extends Component {
  @service store
  @alias('fetchLevelTask.lastSuccessful.value') currentLevel

  didReceiveAttrs() {
    this.fetchLevelTask.perform()
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
