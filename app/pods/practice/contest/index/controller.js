import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import {inject as service} from '@ember/service';

export default class ContestController extends Controller {
  @service store

  status = []
  difficulty = []

  @computed('difficulty', 'status')
  get filteredProblems() {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = this.difficulty
    }
    filter.submission_status = this.status
    
    return this.store.query('problem', { 
      filter,
      contest_id: this.contest.id
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
}
