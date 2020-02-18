import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ContentListView extends Component {
  @service store
  
  @alias('fetchContentsTask.lastSuccessful.value') contents
  
  difficulty = []
  status = null
  tags = []
  showError = false
  
  didReceiveAttrs() {
    this.fetchContentsTask.perform(this.contentFilter, this.page)
    this.set('searchQuery', this.query)
  }

  @computed('difficulty', 'tags', 'query')
  get contentFilter() {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = {
        $in: this.difficulty
      }
    }
    if (this.tags.length) {
      filter.tags = {
        id: {
          $in: this.tags
        }
      }
    }
    filter.name = {
      $iLike: `%${this.query}%`
    }
    return filter
  }

  @restartableTask fetchContentsTask = function *(filter = {}, page = {}) {
    try {
      return yield this.store.query('content', { 
        filter,
        status: this.status,
        page,
        contest_id: this.contest.id
      })
    } catch (err) {
      console.log(err)
      this.set('showError', true)
    }
  }
}
