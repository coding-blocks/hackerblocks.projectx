import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContestViewComponent extends Component {
  @service store 

  status = []
  difficulty = []
  tag = ''
  
  @computed('contest')
  get problemCount() {
    return this.contest.hasMany('problems').ids().length
  }

  @action
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
