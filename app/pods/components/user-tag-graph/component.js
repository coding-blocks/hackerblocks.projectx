import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class UserTagComponent extends Component {
  @service store

  @alias('fetchUserTagsTask.lastSuccessful.value') userTags

  @computed('userTags.@each.tag', 'userTags.@each.rating') 
  get chartData() {
    const userTags = this.get('userTags')
    if(userTags) {
      return userTags.map(ut => {
        return {
          x: ut.get('tag.name'),
          y: Math.round(ut.get('rating'))
        }
      })
    } else {
      return []
    }
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
