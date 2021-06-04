import Controller from '@ember/controller';
import { action, computed } from '@ember/object'
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class UpcomingController extends Controller {
  @service store

  queryParams = ['offset', 'limit']
  offset = 0
  limit = 6
  q = ''

  @computed('offset', 'limit')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }

  @computed('q')
  get filter() {
    this.set('page.offset', 0)
    if (this.q !== '')
      return {
        name: {
          $iLike: `%${this.q}%`
        }
      }
  }

  @restartableTask fetchContestsTask = function* () {
    try {
      return yield this.store.query('college_contest', {
        filter: this.filter,
        page: this.page,
        custom: {
          ext: 'url',
          url: 'upcoming',

        }
      })
    } catch (err) {
      this.set('showError', true)
    }
  }

  @action
  setOffset(offset) {
    this.set('page.offset', offset)
    this.fetchContestsTask.perform()
  }

  @restartableTask createRegistrationTask = function* (collegeContest) {
    yield this.store.createRecord('contest-registration', {
      contest: collegeContest.get('contest'),
      contentTypeId: collegeContest.get('id')
    }).save()
  }
}
