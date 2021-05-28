import Controller from '@ember/controller';
import { computed, action } from '@ember/object'
import { inject as service } from '@ember/service';
import Moment from 'moment';

export default class DCBIndexController extends Controller {
  @service session 

  @computed('contents')
  get previous_contents() {
    return this.contents
      .filter(content => content.dcbContents && !(Moment(content.dcbContents.start) > Moment().subtract(1, 'day')))
  }

  @action
  async toggleBookmark(problem) {
    const bookmark = await problem.get('bookmarkedContent')
    if (bookmark) {
      return  bookmark.destroyRecord()
    }
    const bookmarkProblem = this.store.createRecord('bookmarked-content', {
      contest: this.contest,
      content: this.top_content
    })

    bookmarkProblem.save()
  }

  @action onTimerEnd(){
    window.location.reload()
  }
}
