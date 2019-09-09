import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';

export default class DailyGoalCardComponent extends Component {
  @service store;
  @service currentUser;

  totalDcbs = 7

  @computed('streak')
  get nextDCBCount(){
    if(this.streak){
      const perfectSubmissionCount = this.streak.get('perfectSubmissionCount') || 0
      this.set('totalDcbs', (Math.floor(perfectSubmissionCount / 7) + 1) * 7)
      return 7 - (perfectSubmissionCount % 7)
    }
  }
  
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
