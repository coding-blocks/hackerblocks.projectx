import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class BookmarkedProblemsView extends Component {
  @service store

  @restartableTask fetchBookmarkedContentsTask = function *() {
    return yield this.store.query('bookmarked-content', {
      include: 'contest,content',
      exclude: 'user.*,contest.*,content.*'
    })
  }
}
