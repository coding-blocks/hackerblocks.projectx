import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ContentListView extends Component {
  @service store
  
  @alias('fetchContentsTask.lastSuccessful.value') contents
  
  difficulty = []
  status = null
  tags = []
  showError = false
  
  didReceiveAttrs() {
    this.fetchContentsTask.perform()
    this.set('searchQuery', this.query)
  }

  @restartableTask fetchContentsTask = function *() {
    try {
      return yield this.store.query('content', { 
        filter: this.filter,        
        page: this.page,
        contest_id: this.contest.id
      })
    } catch (err) {
      console.log(err)
      this.set('showError', true)
    }
  }
}
