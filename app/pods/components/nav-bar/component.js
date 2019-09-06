import Component from '@ember/component';
import { inject as service } from '@ember/service'
import { alias } from '@ember/object/computed'
import { action } from '@ember/object';
import config from 'hackerblocks/config/environment'

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

  get logoutLink () {
    return config.oneauthURL + '/logout?redirect=' + config.publicUrl + '/logout'
  }
}
