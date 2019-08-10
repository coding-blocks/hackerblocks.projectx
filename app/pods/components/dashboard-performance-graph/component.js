import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class PerformanceChart extends Component {
  @service store
  @service currentUser

  @alias('fetchPerformanceData.lastSuccessful.value') data

  options = {
    legend: {
      display: false
    }, 
  }

  @computed('data')
  get performanceData() {
    if (this.data) {
      return {
        labels: this.data.map(row => moment.monthsShort(row.month - 1)),
        datasets: [
          {
            label: '',
            data: this.data.mapBy('score'),
            fill:false,
            borderColor:               this.gradient,
            pointBorderColor:          this.gradient,
            pointHoverBorderColor:     this.gradient,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 5,
            // borderWidth: 5
          }
        ]
      }
    }
  }

  didReceiveAttrs() {
    this.fetchPerformanceData.perform()
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    const gradient = ctx.createLinearGradient(200, 0, 100, 0)
    gradient.addColorStop(0, '#ec6333')
    gradient.addColorStop(1, '#f19633')
    this.set('gradient', gradient)
  }

  @restartableTask fetchPerformanceData = function *() {
    return yield this.store.query('overall-leaderboard', {
      filter: {
        createdAt: {
          $gt: moment().subtract(6, 'month').toDate()
        },
        user_id: this.currentUser.user.id
      },
      sort: 'year,month'
    })
  }
}
