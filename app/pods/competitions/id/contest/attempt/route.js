import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AttemptRoute extends Route {
  @service navigation

  beforeModel() {
    const contest = this.modelFor('competitions.id.contest').contest
    const problem_id = contest.hasMany('problems').ids()[0]
    this.transitionTo('competitions.id.contest.attempt.problem', problem_id)
  }

  deactivate() {
    this.navigation.setVisibility(true)
  }
  
  activate() {
    this.navigation.setVisibility(false)
  }
}
