import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import moment from 'moment';

export default class ProblemController extends Controller {
  @computed('problem')
  get dcbEnded() {
    return moment(this.problem.dcbProblems.start) < moment().subtract(1, 'day')
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

  @action onTimerEnd() {
    window.location.reload()
  }
}
