import Component from '@ember/component';
import { inject as service } from '@ember/service'
import { alias } from '@ember/object/computed'
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @service session
  @service currentUser
  @alias('currentUser.user') user

  hideHamburgerNav = true
  mobileSelectedTab = 'classroom'

  @action 
  toggleHamburgerNav() {
    this.toggleProperty('hideHamburgerNav')
  }
}
