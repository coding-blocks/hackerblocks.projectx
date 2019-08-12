import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { get } from '@ember/object'

export default class RegisterButtonComponent extends Component {
  @service store;

  @restartableTask createRegistrationTask = function *(contestTypeModel) {
    yield this.store.createRecord('contest-registration', {
      contest: get(this, 'contestTypeModel.contest'),
      contentTypeId: get(this, 'contestTypeModel.id') 
    }).save()
  }
}
