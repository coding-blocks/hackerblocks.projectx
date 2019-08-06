import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class RegisteredContestComponent extends Component{
  @service store;
  @service currentUser;

  @computed('currentUser')
  get registrations(){
    return this.store.query('registration', {
      filter: {
        user_id: this.currentUser.user.id
      },
      include: 'contest'
    })
  }
}
