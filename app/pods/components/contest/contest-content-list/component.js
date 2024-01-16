import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service} from '@ember/service';

export default class ContentList extends Component {
  @service store

  didReceiveAttrs() {
    this.set('taskTrigger', true)
  }

  @restartableTask fetchContentsTask = function *() {
    try {
      return yield this.store.query('content', { 
        filter: this.filter,       
        filterRelationships: this.filterRelationships, 
        exclude: 'submissions,web_challenge_submissions',
        page: this.page,
        contest_id: this.contest.id
      })
    } catch (err) {
      console.log(err)
      this.set('showError', true)
    }
  }
}
