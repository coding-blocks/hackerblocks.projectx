import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class UpcomingController extends Controller{
  @service currentUser

  @restartableTask createAttemptTask = function *(collegeContest){
    yield this.store.createRecord('registration', {
      contest: collegeContest.get('contest'), 
    }).save()
  }
}
