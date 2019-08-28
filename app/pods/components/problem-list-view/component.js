import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ProblemListView extends Component {
  @service store
  
  @alias('fetchProblemsTask.lastSuccessful.value') problems
  
  difficulty = []
  status = null
  tags = []
  showError = false
  
  didReceiveAttrs() {
    this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }

  @computed('difficulty', 'tags', 'query')
  get problemFilter() {
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

  @restartableTask fetchProblemsTask = function *(filter = {}, page = {}) {
    try {
      return yield this.store.query('problem', { 
        filter,
        status: this.status,
        page,
        contest_id: this.contest.id
      })
    } catch (err) {
      this.set('showError', true)
    }
  }
}
