import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class ProfileBadgesComponent extends Component{
  @service store;

  didReceiveAttrs(){
    const badges = this.store.findAll('user-level', {
      include: 'contest'
    })
    this.set('badges', badges)
  }
}
