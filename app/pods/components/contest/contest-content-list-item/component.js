import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ContentListItem extends Component {
  @service store

  @computed('content.topSubmission', 'solveButtonClass')
  get _solveButtonClass() {
    if (this.content.get('topSubmission.id')) {
      if (this.content.get('topSubmission.score') === 100) {
        return 'button-solid button-green'
      }
      return 'button-solid button-orange'
    }

    return this.solveButtonClass || 'button-dashed button-orange'
  }

  @computed('content.topSubmission', 'solveButtonClass')
  get _solveButtonText() {
    if (this.content.get('topSubmission.id')) {
      if (this.content.get('topSubmission.score') === 100) {
        return 'Solve Again'
      }
      return 'Try Again'
    }

    return 'Solve Challenge'
  }

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
