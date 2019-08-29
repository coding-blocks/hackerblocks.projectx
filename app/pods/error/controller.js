import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ErrorController extends Controller {
  @service router

  queryParams = ['errorCode', 'next']
  next = '/'

  @action
  tryAgain() {
    this.transitionToRoute(this.next)
  }

  @computed('errorCode')
  get errorComponent() {
    switch (this.errorCode) {
      case 'USER_EMAIL_NOT_VERIFIED': return "error-view/user-email-not-verified"
    }
  }
}
