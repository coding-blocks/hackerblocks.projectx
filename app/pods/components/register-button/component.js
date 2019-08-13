import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { get } from '@ember/object'
import { later }  from '@ember/runloop';

export default class RegisterButtonComponent extends Component {
  @service store;

  registeredNow = false

  @restartableTask createRegistrationTask = function *(contestTypeModel) {
    this.set('registeredNow', true)
    yield this.store.createRecord('contest-registration', {
      contest: get(this, 'contestTypeModel.contest'),
      contentTypeId: get(this, 'contestTypeModel.id') 
    }).save()
    later(() => {
      this.set('registeredNow', false)
    }, 2000)
  }
}
