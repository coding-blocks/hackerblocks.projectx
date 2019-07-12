import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ContestController extends Controller {
  status = []
  difficulty = []

  @computed('contest.problems', 'difficulty', 'status')
  get filteredProblems() {
    let problems = this.contest.problems
    if (this.difficulty.length) {
      problems = problems.filter(p => this.difficulty.indexOf(p.difficulty) !== -1)
    }
    if (this.status.length) {
      let filtered = []
      if (this.status.includes("solved")) {
        filtered = filtered.concat(problems.filter(p => p.topSubmission.get('score') === 100))
      }
      if (this.status.includes("wrong")) {
        filtered = filtered.concat(problems.filter(p => p.topSubmission.get('score') === 0))
      }
      if (this.status.includes("partial")) {
        filtered = filtered.concat(problems.filter(p => p.topSubmission.get('score') > 0 && p.topSubmission.get('score') < 100 ))
      }
      if (this.status.includes("unsolved")) {
        filtered = filtered.concat(problems.filter(p => !p.topSubmission.get('id')))
      }
      problems = filtered
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
