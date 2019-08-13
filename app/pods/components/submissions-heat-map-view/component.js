import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class SubmissionHeatMapComponent extends Component {
  @service store;
  @service currentUser;

  date = new Date()

  @computed('currentUser')
  get userHimself() {
    return this.currentUser.user.id === this.userId
  }

  didReceiveAttrs() {
    this.fetchSubmissionsForDateTask.perform()
  }

  @restartableTask fetchSubmissionsForDateTask = function* () {
    const submissions = yield this.store.query('submission', {
      custom: {
        ext: 'url',
        url: 'date'
      },
      date: this.date,
      user_id: this.userId,
      include: 'problem',
      exclude: 'problem.*,user.*,contest.*',
      page: this.page
    })
    this.set('submissions', submissions)
  }

  @action
  fetchSubmissionsForDate(date){
    this.set('date', date)
    this.set('page.offset', 0)
    this.fetchSubmissionsForDateTask.perform()
  }
}