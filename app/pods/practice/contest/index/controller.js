import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ContestController extends Controller {
  status = null
  difficulty = null

  @computed('difficulty')
  get difficultyString() {
    switch (parseInt(this.difficulty)) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Difficult'
      default: return ''
    }
  }

  @computed('contest.problems', 'difficulty')
  get filteredProblems() {
    let problems = this.contest.problems
    if (this.difficulty){
      problems = problems.filterBy('difficulty', this.difficulty)
    }

    return problems
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
