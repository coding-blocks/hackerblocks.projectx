import Component from '@ember/component';
import { inject as service } from '@ember/service'
import { alias } from '@ember/object/computed'
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @service session
  @service currentUser
  @alias('currentUser.user') user

  hideHamburgerNav = true

  @action 
  toggleHamburgerNav() {
    console.log('arreey toh')
    this.toggleProperty('hideHamburgerNav')
  }
}
