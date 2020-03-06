import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ContentListItem extends Component {
  @service store

  @restartableTask bookmarkContentTask = function *() {
    const bookmarkedContent = yield this.content.get('bookmarkedContent')
    if (bookmarkedContent) {
      return bookmarkedContent.destroyRecord()
    }

    return (this.store.createRecord('bookmarked-content', {
      contest: this.contest,
      content: this.content
    })).save()
  }
}
