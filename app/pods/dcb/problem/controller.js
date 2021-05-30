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
  async toggleBookmark(content) {
    const bookmark = await content.get('bookmarkedContent')
    if (bookmark) {
      return bookmark.destroyRecord()
    }

    const bookmarContent = this.store.createRecord('bookmarked-content', {
      contestTypeId: this.dcb.id,
      contest: this.contest,
      content: this.content
    })

    bookmarContent.save()
  }

  @action onTimerEnd() {
    window.location.reload()
  }
}
