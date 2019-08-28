import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store

  queryParams = ['offset', 'limit', 'status', 'difficulty', 'tags', 'q']
  offset = 0
  limit = 10
  status = null
  difficulty = []
  tags = []
  q = ''

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
