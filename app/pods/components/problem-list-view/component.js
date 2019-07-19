import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ProblemListView extends Component {
  @service store
  
  problems = []

  didReceiveAttrs() {
    this.fetchProblemsTask.perform(this.filter, this.page)
  }

  @restartableTask fetchProblemsTask = function *(filter = {}, page = {}) {
    const problems = yield this.store.query('problem', { 
      filter,
      page,
      contest_id: this.contest.id
    })
    this.set('problems', problems)
    return problems
  }
}
