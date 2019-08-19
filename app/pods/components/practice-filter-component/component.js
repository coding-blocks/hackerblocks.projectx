import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class PracticeFilterComponent extends Component {
  @service store

  @alias('searchTagsTask.lastSuccessful.value') availableTags

  @action 
  updateDifficultyFilter(val) {
    if (this.difficulty.includes(val)) {
      this.difficulty.removeObject(val)
    } else {
      this.difficulty.addObject(val)
    }
    this.changeDifficultyFilter([...this.difficulty])
  }
  @action 
  updateStatusFilter(val) {
    if (this.status.includes(val)) {
      this.status.removeObject(val)
    } else {
      this.status.addObject(val)
    }
    this.changeStatusFilter([...this.status])
  }
  @action
  updateTagFilter(val) {
    this.changeTagsFilter(val)
  }

  @dropTask searchTagsTask = function *(query = '') {
    return yield this.store.query('tag', {
      filter: {
        name: {
          $iLike: `%${query}%`
        }
      }
    })
  }
}
