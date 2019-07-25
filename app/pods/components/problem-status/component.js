import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ProblemStatusComponent extends Component {
  @service api

  didReceiveAttrs() {
    this.fetchStatusTask.perform()
  }

  @restartableTask fetchStatusTask = function *() {
    return yield this.api.request(`problems/${this.problem_id}/status`, {
      method: 'GET',
      data: {
        contest_id: this.contest.id
      }
    })
  }
}
