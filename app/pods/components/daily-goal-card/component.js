import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';

export default class DailyGoalCardComponent extends Component {
  @service store;
  @service currentUser;

  totalDcbs = 7

  didReceiveAttrs(){
    if(this.streak){
      const perfectSubmissionCount = this.streak.get('perfectSubmissionCount')
      this.set('totalDcbs', (Math.floor(perfectSubmissionCount / 7) + 1) * 7)
    }
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
