import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class BookmarkedProblemsView extends Component {
  @service store

  @alias('fetchBookmarkedProblemsTask.lastSuccessful.value') bookmarkedProblems

  didReceiveAttrs() {
    this.fetchBookmarkedProblemsTask.perform()
  }

  @restartableTask fetchBookmarkedProblemsTask = function *() {
    return yield this.store.findAll('bookmarked-problem', {
      include: 'problem'
    })
  }
}
