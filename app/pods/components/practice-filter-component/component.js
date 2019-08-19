import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class PracticeFilterComponent extends Component {
  @service store

  @alias('searchTagsTask.lastSuccessful.value') availableTags

  @computed('tags')
  get selectedTags() {
    if (this.tags.length) {
      return this.store.query('tag', {
        filter: {
          id: {
            $in: this.tags
          }
        }
      })
    }
  }

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
    if (val === this.status){
      this.changeStatusFilter(null)
    } else {
      this.changeStatusFilter(val)
    }
  }
  @action
  updateTagFilter(vals) {
    this.changeTagsFilter(vals.mapBy('id'))
  }

  @restartableTask searchTagsTask = function *(query = '') {
    yield timeout(500)
    return yield this.store.query('tag', {
      filter: {
        name: {
          $iLike: `%${query}%`
        }
      }
    })
  }
}
