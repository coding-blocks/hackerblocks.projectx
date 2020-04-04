import Service from '@ember/service';
import Moment from 'moment';
import ENV from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import moment from 'moment';

export default class ServerTime extends Service {
  @service poll
  @service ajax
  
  now = null

  startSync () {
    this.refreshCurrentTime.perform()
    this.set('now', Moment())
    this.poll.addPoll({
      interval: 6000,
      callback: () => this.refreshCurrentTime.perform()
    })
    moment.now = () => {
      const offset = new Date(this.now).getTime() - Date.now();
      return offset + Date.now();
    }
  }

  @restartableTask refreshCurrentTime = function * () {
    const data = yield this.ajax.request(ENV.apiHost + '/time')
    this.set ('now', Moment.unix(data.now/1000))
  }
}
