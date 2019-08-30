import Service from '@ember/service';
import Moment from 'moment';
import ENV from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import moment from 'moment';

export default Service.extend({
  poll: service(),
  ajax: service(),
  now: null,

  init () {
    this._super (...arguments)

    this.refreshCurrentTime.perform()
    this.set('now', Moment())
    const tickPollId = this.poll.addPoll({
      interval: 1000,
      callback: () => this.tick.perform()
    })
    const refreshPollId = this.poll.addPoll({
      interval: 60000,
      callback: () => this.refreshCurrentTime.perform()
    })
    this.set('tickPollId', tickPollId)
    this.set('refreshPollId', refreshPollId)
  },

  willDestroyElement() {
    this.poll.stopPoll(this.tickPollId)
    this.poll.stopPoll(this.refreshPollId)
  },

  tick: task(function* () {
    yield this.now.add(1, 'second')
  }),

  refreshCurrentTime: task (function * () {
    const data = yield this.ajax.request(ENV.apiHost + '/time')
    this.set ('now', Moment.unix(data.now/1000))
    this.syncMoment()
  }).restartable(),

  getUnixTime () {
    return this.now.unix()
  },

  getTime () {
    return this.now
  },

  syncMoment () {
    const offset = new Date(this.now).getTime() - Date.now();
    moment.now = function () {
      return offset + Date.now();
    }
  }
});
