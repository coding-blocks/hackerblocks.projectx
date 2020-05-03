import Service from '@ember/service';
import Moment from 'moment';
import ENV from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import moment from 'moment';

export default class ServerTime extends Service {
  @service poll
  @service ajax
  
  offset = 0

  constructor() {
    super(...arguments)
    this.refreshCurrentTime.perform()
    this.set('now', Moment())
    this.poll.addPoll({
      interval: 60000,
      callback: () => this.refreshCurrentTime.perform()
    })
    moment.now = () => {
      return Date.now() + this.offset;      
    } 
  }

  @restartableTask refreshCurrentTime = function * () {
    const data = yield this.ajax.request(ENV.apiHost + '/time')
    this.set ('offset', Moment.unix(data.now/1000) - Date.now())
  }
}
