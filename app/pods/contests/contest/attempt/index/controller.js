import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @computed('contest.currentAttempt')
  get nextRoute() {
    const problem_id = this.contest.hasMany('problems').ids()[0]
    if (problem_id) {
      return {
        route: 'contests.contest.attempt.problem', 
        model: problem_id
      }
    } else {
      const quiz_id = this.contest.hasMany('quizzes').ids()[0]
      return {
        route: 'contests.contest.attempt.quiz', 
        model: quiz_id
      }
    }
  }

  @action
  onAfterCreate() {
    const problem_id = this.contest.hasMany('problems').ids()[0]
    if (problem_id) {
      this.transitionToRoute('contests.contest.attempt.problem', problem_id)
    } else {
      const quiz_id = this.contest.hasMany('quizzes').ids()[0]
      this.transitionToRoute('contests.contest.attempt.quiz', quiz_id)
    }
  }
}
