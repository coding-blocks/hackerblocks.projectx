import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Moment from 'moment';

export default class ContdownTimerComponent extends Component {
  @service poll
  @service serverTime

  constructor() {
    super(...arguments)

    const pollId = this.poll.addPoll({
      interval: 1000,
      callback: () => this.send('tick')
    })
    this.set('pollId', pollId)
    this.send('tick')
  }

  willDestroyElement () {
    this.poll.stopPoll(this.pollId);
    return this._super(...arguments)
  }

  @computed('duration', 'startTime')
  get countdownEndTime() {
    return this.startTime.add(this.duration, 'second')
  }

  @computed('now')
  get displayString() {
    if (!this.now) return ''

    const now = Moment.unix(this.now)
    const endTime = this.countdownEndTime
    const diff = Moment(endTime - now)
    const sec = diff.seconds()
    const min = diff.minutes()
    const hrs = diff.hours()

    return `${hrs} Hours ${min} Mins and ${sec} Seconds`
  }

  @computed('now')
  get isCompleted() {
    if (!this.now) return false
    
    const now = Moment.unix(this.now)
    const endTime = this.countdownEndTime
    if (now >= endTime) {
      this.get('poll').stopAll();
      Ember.run.scheduleOnce('render', () => {
        this.get('onComplete')()
      })
      return true;
    } else {
      return false
    }
  }

  @action
  tick() {
    this.set('now', this.serverTime.getUnixTime());
  }
}
