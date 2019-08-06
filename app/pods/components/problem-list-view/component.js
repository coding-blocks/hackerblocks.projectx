import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class ProblemListView extends Component {
  @service store
  
  problems = []
  difficulty = []
  status = []
  showError = false

  didReceiveAttrs() {
    this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }

  @computed('difficulty', 'status')
  get problemFilter() {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = this.difficulty
    }
    filter.submission_status = this.status
    return filter
  }

  @action
  changeStatusFilter(status) {
    this.set('status', status)
    // this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }
  @action
  changeDifficultyFilter(difficulty) {
    this.set('difficulty', difficulty)
    // this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }

  @action
  onApply() {
    this.fetchProblemsTask.perform(this.problemFilter, this.page)
  }

  @restartableTask fetchProblemsTask = function *(filter = {}, page = {}) {
    const problems = yield this.store.query('problem', { 
      filter,
      page,
      contest_id: this.contest.id
    })
    .catch(err => { this.set('showError', true)})
    
    this.set('problems', problems)
    return problems
  }
}
