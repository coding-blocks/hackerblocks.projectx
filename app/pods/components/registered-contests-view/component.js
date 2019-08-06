import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class RegisteredContestView extends Component {
  @service store

  @alias('fetchRegisteredContestTask.lastSuccessful.value') registrations

  didReceiveAttrs() {
    this.fetchRegisteredContestTask.perform()
  }

  @restartableTask fetchRegisteredContestTask = function *() {
    return yield this.store.findAll('contest-registration', {
      include: 'contest'
    })
  }
}
