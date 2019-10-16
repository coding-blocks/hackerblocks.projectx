import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class RegisterButtonComponent extends Component {
  @service store

  @restartableTask createRegistrationTask = function *(form) {
    yield this.store.createRecord('contest-registration', {
      contest: this.contest,
      form
    }).save()
    this.set('success', true)
    if (this.onAfterSave) {
      later(this.onAfterSave, 2000)
    }
  }
}
