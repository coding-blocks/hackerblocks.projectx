import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class ProfileBadgesComponent extends Component{
  @service store;
  @service currentUser;

  @alias('fetchBadgesTask.lastSuccessful.value')
  badges

  didReceiveAttrs(){
    if(!this.userId){
      this.set('userId', this.currentUser.user.id)
    }
    this.fetchBadgesTask.perform()
  }


  @restartableTask fetchBadgesTask = function *() {
    return yield this.store.query('badge', {
      include: 'contest',
      exclude: 'contest.*',
      filter: {
        userId: this.userId
      }
    })
  }
}
