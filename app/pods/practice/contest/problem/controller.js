import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ProblemController extends Controller {
  @service store
  @service api

  @computed('levels')
  get currentContestLevel() {
    return this.levels.findBy('contest.id', this.contest.id)
  }
}
