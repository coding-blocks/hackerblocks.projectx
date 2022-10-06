import Service from '@ember/service';
import ENV from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import moment from 'moment';
import { action } from '@ember/object';

export default class ServerTime extends Service {
  @service poll
  @service ajax
  
  @restartableTask refreshCurrentTime = function * () {
    const data = yield this.ajax.request(ENV.apiHost + '/time')
    const diff = Date.now() - data.now
    this.set('diff', diff)
    this.set('currentTimestamp', Date.now() - data.now)
    moment.now = () => {
      return Date.now() - diff;      
    } 
  }

  @action
  startPolling() {
    this.refreshCurrentTime.perform()
    this.poll.addPoll({
      interval: 60000,
      callback: () => this.refreshCurrentTime.perform()
    })
  }
}
