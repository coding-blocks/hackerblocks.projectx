import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContestController extends Controller {
  @service store

  queryParams = ['offset', 'limit', 'status', 'difficulty']
  offset = 0
  limit = 10
  status = []
  difficulty = []

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
