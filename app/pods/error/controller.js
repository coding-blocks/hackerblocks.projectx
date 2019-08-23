import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ErrorController extends Controller {
  queryParams = ['errorCode']

  @computed('errorCode')
  get message() {
    switch (this.errorCode) {
      case 'USER_EMAIL_NOT_VERIFIED': return "Email address not verified"
    }
  }
}
