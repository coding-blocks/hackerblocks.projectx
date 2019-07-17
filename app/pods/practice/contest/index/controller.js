import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import {inject as service} from '@ember/service';

export default class ContestController extends Controller {
  @service store

  queryParams = ['offset', 'limit', 'difficulty', 'status']
  offset = 0
  limit = 10
  difficulty = []
  status = []

  @computed('offset')
  get page () {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }

  @computed('difficulty', 'status')
  get problemFilter () {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = this.difficulty
    }
    filter.submission_status = this.status
    return filter
  }

  @computed('page.offset', 'problemFilter')
  get filteredProblems() {
    return this.store.query('problem', { 
      filter: this.problemFilter,
      contest_id: this.contest.id,
      page: this.page
    })
  }

  @action
  changeStatusFilter(status) {
    this.set('status', status)
  }
  @action
  changeDifficultyFilter(difficulty) {
    this.set('difficulty', difficulty)
  }
  @action
  setOffset(offset) {
    this.set('offset', offset)
  }
}
