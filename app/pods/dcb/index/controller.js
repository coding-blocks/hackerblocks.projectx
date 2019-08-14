import Controller from '@ember/controller';
import { computed, action } from '@ember/object'
import { inject as service } from '@ember/service';
import Moment from 'moment'

export default class DCBIndexController extends Controller {
  @service session 

  @computed('problems')
  get previous_problems() {
    return this.problems
      .filter(problem => problem.dcbProblems && !(Moment(problem.dcbProblems.start) > Moment().subtract(1, 'day')))
  }

  @action
  async toggleBookmark(problem) {
    const bookmark = await problem.get('bookmark')
    if (bookmark) {
      await bookmark.destroyRecord()
      return problem.set('bookmarkedBy', null)
    }
    const bookmarkProblem = this.store.createRecord('bookmarked-problem', {
      problem,
      contest: this.contest,
      contentTypeId: this.dcb.id
    })

    bookmarkProblem.save()
  }

  @action onTimerEnd(){
    window.location.reload()
  }
}
