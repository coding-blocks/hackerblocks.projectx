import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import {inject as service} from '@ember/service';

export default class ContestController extends Controller {
  @service store

  queryParams = ['offset', 'limit', 'difficulty', 'status']
  offset = 0
  limit = 10
  difficulty = []
  status = []

  @computed('offset')
  get page () {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }
  
  @action
  setOffset(offset) {
    this.set('offset', offset)
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
      contentTypeId: this.practice.id
    })

    bookmarkProblem.save()
  }
}
