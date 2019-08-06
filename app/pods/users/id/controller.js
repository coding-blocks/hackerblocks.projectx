import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class UserIdController extends Controller {
  @service currentUser;

  queryParams = ['offset', 'limit']

  offset = 0
  limit = 10

  @computed('currentUser')
  get userHimself() {
    return this.currentUser.user.id === this.user.id
  }

  @computed('offset')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }

  @action
  setOffset(offset) {
    this.set('offset', offset)
  }
}
