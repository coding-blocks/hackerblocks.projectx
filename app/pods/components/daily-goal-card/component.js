import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class DailyGoalCardComponent extends Component {
  @service store;
  @service currentUser;

  didReceiveAttrs(){
    this.fetchBadgesTask.perform()
  }

  @restartableTask fetchBadgesTask = function *() {
    const badges = yield this.store.query('badge', {
      filter: {
        userId: this.currentUser.user.id,
        contestId: 1
      }
    })
    this.set('badges', badges)
  }
}
