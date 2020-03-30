import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import moment from 'moment'

export default class IndexController extends Controller {
  @service api

  contestCount = {
    'admission-contests': 0,
    'course-contests': 0,
    'college-contests': 0
  }

  didInsertElement() {
    this.fetchModelCount.perform('admission-contests')
    this.fetchModelCount.perform('course-contests')
    this.fetchModelCount.perform('college-contests')
  }

  @restartableTask fetchModelCount = function* (model) {
    const { count } = yield this.api.request(`${model}/count`)
    this.set(`contestCount.${model}`, count)
  }

  @restartableTask fetchContests = function* () {
    const params = {
      page: { limit: 6 },
      sort: 'start_time',
      filter: {
        accept_registrations: true,
        start_time: {
          $gt: moment().toISOString()
        }
      }
    }

    return yield this.store.query('contest', params)
  }
}
