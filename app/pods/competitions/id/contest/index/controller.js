import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store
  @service currentUser

  showStartDialog = false

  @computed('contest')
  get nextProblemId(){
    if (this.contest)
      return this.contest.hasMany('problems').ids()[0]
  }

  @restartableTask createAttemptTask = function *() {
    const contest_attempt = this.store.createRecord('contest-attempt', {
      contest: this.contest
    })
    yield contest_attempt.save()
    this.transitionToRoute('competitions.id.contest', this.contest.id)
  }
}
