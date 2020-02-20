import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store
  @service router

  queryParams = ['offset', 'limit', 'status', 'difficulty', 'tags', 'q']
  offset = 0
  limit = 10
  difficulty = []
  tags = []
  q = ''

  @computed('offset', 'limit')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }
  
  @computed('status','difficulty','tags', 'q')
  get filter() {
    return {
      status: this.status,
      difficulty: {
        $in: this.difficulty
      },
      tags: {
        id: {
          $in: this.tags
        }
      },
      name: {
        $iLike: `%${this.q}%`
      }
    }
  }

  @computed('contest.currentAttempt')
  get nextRoute() {
    return 'contests.contest.attempt'
  }

  @action
  handleUnverifiedEmail(code) {
    this.transitionToRoute('error', {
      queryParams: {
        errorCode: code,
        next: this.router.get('currentURL')
      }
    })
  }

  @action
  onAfterCreate() {
    const problem_id = this.contest.hasMany('problems').ids()[0]
    if (problem_id) {
      this.transitionToRoute('contests.contest.attempt.problem', problem_id)
    } else {
      const quiz_id = this.contest.hasMany('quizzes').ids()[0]
      this.transitionToRoute('contests.contest.attempt.quiz', quiz_id)
    }
  }

  @action
  setOffset(offset) {
    this.set('offset', offset)
  }

  async toggleBookmark(problem){
    const bookmark = await problem.get('bookmark')
    if(bookmark){
      await bookmark.destroyRecord()
      return problem.set('bookmarkedBy', null)
    }
    const bookmarkProblem = this.store.createRecord('bookmarked-problem', {
      problem,
      contest: this.contest,
      contentTypeId: this.contentTypeId
    })

    bookmarkProblem.save()
  }
}
