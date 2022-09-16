import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class UserTagComponent extends Component {
  @service store

  @alias('fetchUserTagsTask.lastSuccessful.value') userTags

  options = {
    legend: {
      display: false
    }, 
    scales: {
      xAxes: [{
          barThickness: 30,
          gridLines: {
              offsetGridLines: true
          }
      }]
    } 
  }

  @computed('userTags.@each.tag', 'userTags.@each.rating') 
  get chartData() {
    const userTags = this.get('userTags')
    if(userTags) {
      return {
        labels: userTags.map(_ => _.get('tag.name')),
        datasets: [
          {
            data: userTags.map(_ => Math.round(+_.get('rating'))),
            fill:false,
            backgroundColor: this.gradient
          }
        ]
      }
    } else {
      return []
    }
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, '#ec6333')
    gradient.addColorStop(1, '#f19633')
    this.set('gradient', gradient)
  }

  didReceiveAttrs() {
    this.fetchUserTagsTask.perform()
  }

  @task fetchUserTagsTask = function* () {
    return yield this.store.query('user-tag', {
      filter: {
        user_id: this.userId
      },
      page: {
        limit: 200
      }
    })
  }
}
