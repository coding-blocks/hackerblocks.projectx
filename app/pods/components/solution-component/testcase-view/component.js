import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';

export default class TestCaseView extends Component {
  @service store
  @alias('fetchTestcasesTask.lastSuccessful.value') testcases

  didReceiveAttrs() {
    this.fetchTestcasesTask.perform()
  }

  @restartableTask unlockTestcasesTask = function *() {
    const unlockedTestcases = this.store.createRecord('unlocked-testcase', {
      contest: this.contest,
      problem: this.problem
    })
    yield unlockedTestcases.save()
    yield this.fetchTestcasesTask.perform()
  }

  @restartableTask fetchTestcasesTask = function *() {
    return yield this.store.query('testcase', {
      custom: {
        ext: 'url',
        url: 'current-testcases'
      },
      contest_id: this.contest.get('id'),
      problem_id: this.problem.get('id')
    })
  }
}
