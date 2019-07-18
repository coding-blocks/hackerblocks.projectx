import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ProblemListView extends Component {
  @service store
  
  status = []
  difficulty = []
  problems = []

  didReceiveAttrs() {
    const filter = {}
    if (this.difficulty.length) {
      filter.difficulty = this.difficulty
    }
    filter.submission_status = this.status
    this.fetchProblemsTask.perform(filter)
  }

  @restartableTask fetchProblemsTask = function *(filter) {
    const problems = yield this.store.query('problem', { 
      filter,
      contest_id: this.contest.id
    })
    this.set('problems', problems)
    return problems
  }
}
