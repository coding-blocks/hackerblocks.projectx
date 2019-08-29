import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotVerifiedComponent extends Component {
  @service currentUser
  @service session

  @action
  async reloadUser() {
    this.currentUser.load(true)
    if (this.currentUser.user.get('email') && this.currentUser.user.get('verifiedemail')) {
      this.tryAgain()
    }
  }
}
