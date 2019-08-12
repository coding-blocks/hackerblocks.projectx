import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class PublicContestCard extends Component {
  @service api

  @alias('fetchContestCount.lastSuccessful.value.count') contestCount

  didReceiveAttrs() {
    this.fetchContestCount.perform()
  }

  @restartableTask fetchContestCount = function *() {
    return yield this.api.request(`${this.model}/count`)
  }
}
