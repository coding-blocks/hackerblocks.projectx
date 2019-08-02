import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class LevelView extends Component {
  @service store
  @alias('fetchLevelTask.lastSuccessful.value') levels

  didReceiveAttrs() {
    this.fetchLevelTask.perform()
  }

  @computed('levels')
  get topLevel() {
    if (this.levels) {
      return this.levels.toArray()[0]
    }
  }

  @restartableTask fetchLevelTask = function *() {
    return yield this.store.query('user_level', {
      filter: {
        contestId: this.contest.get('id')
      }
    })
  }
}
