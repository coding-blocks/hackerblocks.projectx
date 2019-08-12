import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ProblemController extends Controller {
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
