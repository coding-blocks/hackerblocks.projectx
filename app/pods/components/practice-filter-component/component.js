import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class PracticeFilterComponent extends Component {
  @service store
  @service api

  @alias('searchTagsTask.lastSuccessful.value') availableTags

  @computed('tags')
  get selectedTags() {
    if (this.tags.length && (this.allTags && this.allTags.length)) {
      return this.get('allTags').filter(tag => this.tags.includes(tag.id))
    }
  }

  async didReceiveAttrs() {
    const allTags = await this.searchTagsTask.perform()
    this.set('allTags', allTags)
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
    return yield this.api.request('/tags', {
      data: {
        filter: {
            "name like": `%${query}%`,
            "is_active =": true
        }
      }
    })
  }
}
