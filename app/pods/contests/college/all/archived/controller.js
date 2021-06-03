import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class ArchivedController extends Controller {
  @service store
  @service router
  @service api

  queryParams = ['offset', 'limit']
  offset = 0
  limit = 10

  @restartableTask fetchContestsTask = function* () {
    try {
      return yield this.store.query('college_contest', {
        page: this.page,
        custom: {
          ext: 'url',
          url: 'archived',

        }
      })
    } catch (err) {
      console.log(err)
      this.set('showError', true)
    }
  }

  @computed('offset', 'limit')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }
}
