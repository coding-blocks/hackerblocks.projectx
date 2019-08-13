import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AttemptRoute extends Route {
  @service navigation

  async beforeModel() {
    const admission_contest = this.modelFor('contests.admission.contest')
    const contest = await admission_contest.contest
    const problem_id = contest.hasMany('problems').ids()[0]
    if (problem_id) {
      this.transitionTo('contests.admission.contest.attempt.problem', problem_id)
    } else {
      const quiz_id = contest.hasMany('quizzes').ids()[0]
      this.transitionTo('contests.admission.contest.attempt.quiz', quiz_id)
    }
  }

  activate() {
    this.navigation.setVisibility(false)
  }
  
  deactivate() {
    this.navigation.setVisibility(true)
  }
}
