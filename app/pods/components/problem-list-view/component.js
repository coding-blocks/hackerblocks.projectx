import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ProblemListView extends Component {
  @service store
  
  @alias('fetchProblemsTask.lastSuccessful.value') problems
  
  difficulty = []
  status = []
  tag = ''
  showError = false

  didReceiveAttrs() {
    this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }

  @computed('difficulty', 'status', 'tag')
  get problemFilter() {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = this.difficulty
    }
    filter.submission_status = this.status
    filter.tags = {
      name: {
        $iLike: `%${this.tag}%`
      }
    }
    return filter
  }

  @restartableTask fetchProblemsTask = function *(filter = {}, page = {}) {
    try {
      return yield this.store.query('problem', { 
        filter,
        page,
        contest_id: this.contest.id
      })
    } catch (err) {
      this.set('showError', true)
    }
  }
}
