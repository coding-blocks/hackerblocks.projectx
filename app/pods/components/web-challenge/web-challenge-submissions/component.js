import Component from '@ember/component';
import { alias } from '@ember/object/computed'
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class WebChallengeSubmission extends Component {
  @service store
  @alias('fetchSubmissionsForUserTask.lastSuccessful.value') submissions

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchSubmissionsForUserTask.perform()
  }

  @task fetchSubmissionsForUserTask = function *() {
    return yield this.store.query('web-challenge-submission', {
      custom: {
        ext: 'url',
        url: yield this.contest.get('currentAttempt.id')
      },
      sort: '-createdAt'
    })
  }
}
