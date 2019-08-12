import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class DashboardCarousel extends Component {
  @service store

  @alias('fetchCarouselsTask.lastSuccessful.value') banners

  didReceiveAttrs() {
    this.fetchCarouselsTask.perform()
  }

  @restartableTask fetchCarouselsTask = function *() {
    return yield this.store.findAll('dashboard-banner')
  }
}
