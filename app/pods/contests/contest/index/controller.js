import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

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
    this.transitionToRoute('contests.contest.attempt')
  }
}
