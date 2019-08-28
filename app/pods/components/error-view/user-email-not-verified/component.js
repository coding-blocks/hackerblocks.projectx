import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotVerifiedComponent extends Component {
  @service currentUser

  @action
  reloadUser() {
    this.currentUser.load(true)
    this.tryAgain()
  }
}
