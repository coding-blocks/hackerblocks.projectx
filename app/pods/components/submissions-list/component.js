import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class SubmissionListComponent extends Component {
  @service store

  showModal = false

  @restartableTask fetchSubmissionsTask = function *() {
    const contest_id = this.contest.get('id')
    const content_id = this.content.get('id')

    const submissions = yield this.store.query('submission', {
      filter: {
        contest_id,
        content_id
      },
      sort: '-createdAt'
    })

    return submissions
  }

  @action
  viewSubmission (submission) {
    this.set("showModal", true)
    this.set("SelectedSubmission", submission)
  }
}
