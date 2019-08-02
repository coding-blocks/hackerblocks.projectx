import Route from '@ember/routing/route';

export default class AttemptRoute extends Route {
  async beforeModel() {
    const admission_contest = this.modelFor('contests.admission.contest')
    const contest = await admission_contest.contest
    const problem_id = contest.hasMany('problems').ids()[0]
    if (problem_id) {
      this.transitionTo('contests.admission.contest.attempt.problem', problem_id)
    }
    const quiz_id = contest.hasMany('quizzes').ids()[0]
    this.transitionTo('contests.admission.contest.attempt.quiz', quiz_id)
  }
}
