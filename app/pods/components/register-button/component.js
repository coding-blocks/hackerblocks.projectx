import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class RegisterButtonComponent extends Component {
  @service store;

  @restartableTask createRegistrationTask = function *(contestTypeModel) {
    yield this.store.createRecord('contest-registration', {
      contest: contestTypeModel.get('contest'),
      contentTypeId: contestTypeModel.get('id')
    }).save()
  }
}
