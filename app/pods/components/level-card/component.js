import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class LevelCard extends Component {
  @service store;
  @service currentUser;
  
  @alias('fetchBadgesTask.lastSuccessful.value')
  badges 

  didReceiveAttrs(){
    this.fetchBadgesTask.perform()
  }
  
  @restartableTask fetchBadgesTask = function *(){
    const userId = this.currentUser.user.id
    if(userId){
      return yield this.store.query('badge', {
        include: 'contest',
        filter: {
          userId,
          contestId: this.contest.id
        }
      })
    }
  }

  @computed('level')
  get progress() {
    return (this.level.perfectSubmissionCount / this.level.nextRequiredSubmissionCount)*100
  }
}
