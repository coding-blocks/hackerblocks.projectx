import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'hackerblocks/config/environment';

export default class IndexController extends Controller {
  @service store
  @service router

  queryParams = ['offset', 'limit', 'status', 'difficulty', 'tags', 'q', 'monitorerError']
  offset = 0
  limit = 10
  difficulty = []
  tags = []
  q = ''
  monitorerError = null

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
      name: {
        $iLike: `%${this.q}%`
      }
    }
  }

  @computed('status','difficulty','tags', 'q')
  get filterRelationships() {
    return {
      content_tags: {
        tagId: {
          $in: this.tags
        }
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
    window.open(`${ENV.publicUrl}/contests/${this.contest.id}/attempt/`, '_blank', 'popup')
  }
}
