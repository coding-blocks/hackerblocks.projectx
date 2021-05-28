import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import moment from 'moment';

export default class ProblemController extends Controller {
  @computed('content')
  get dcbEnded() {
    return moment(this.content.dcbContents.start) < moment().subtract(1, 'day')
  }

  @action
  async toggleBookmark(problem) {
    const bookmark = await problem.get('bookmarkedContent')
    if (bookmark) {
      return bookmark.destroyRecord()
    }
    const bookmarkProblem = this.store.createRecord('bookmarked-content', {
      contest: this.contest,
      content: this.content
    })

    bookmarkProblem.save()
  }

  @action onTimerEnd() {
    window.location.reload()
  }
}
