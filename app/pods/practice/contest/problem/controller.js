import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ProblemController extends Controller {
  @service store
  @service api

  @computed('problem')
  get canSubmitReview() {
    return this.problem.canSubmitReview
  }
}
