import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class UserIdController extends Controller{
  @service currentUser;

  @computed('currentUser')
  get userHimself(){
    return this.currentUser.user.id === this.user.id
  }

  @restartableTask fetchSubmissionsForDayTask = function* (date) {
    const submissions = yield this.store.query('submission', {
      custom: {
        ext: 'url',
        url: '/date'
      },
      date: date,
      user_id: this.user.id,
      include: 'problem',
      exclude: 'problem.*, user.*, contest.*'
    })

    this.set('submissions', submissions)
  }
}
