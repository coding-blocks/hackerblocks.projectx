import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class SubmissionListComponent extends Component {
  @service store

  didReceiveAttrs() {
    this.fetchSubmissionsTask.perform()
  }

  @restartableTask fetchSubmissionsTask = function *() {
    const contest_id = this.contest.id
    const problem_id = this.problem.id

    const submissions = yield this.store.query('submission', {
      filter: {
        contest_id,
        problem_id
      }
    })

    return submissions
  }
}
