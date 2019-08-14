import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class ProfileBadgesComponent extends Component{
  @service store;
  @service currentUser;

  didReceiveAttrs(){
    if(!this.userId){
      this.set('userId', this.currentUser.user.id)
    }

    const badges = this.store.query('badge', {
      include: 'contest',
      filter: {
        userId: this.userId
      }
    })
    this.set('badges', badges)
  }
}
