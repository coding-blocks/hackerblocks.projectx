import Route from '@ember/routing/route';

export default class AttemptRoute extends Route {
  beforeModel() {
    const { contest } = this.modelFor('competitions.id.contest')
    const problem_id = contest.hasMany('problems').ids()[0]
    this.transitionTo('competitions.id.contest.attempt.problem', problem_id)
  }
}
