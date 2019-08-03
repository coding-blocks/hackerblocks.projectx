import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ProfileCard extends Component{
  @service currentUser;

  @computed('currentUser')
  get userHimself() {
    return this.user.id === this.currentUser.user.id
  }
}
