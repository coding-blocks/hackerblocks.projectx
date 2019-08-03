import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class SolutionComponent extends Component {
  @service store
  @alias('fetchEditorialTask.lastSuccessful.value') editorial

  didReceiveAttrs() {
    this.fetchEditorialTask.perform()
  }

  @restartableTask unlockEditorialTask = function *() {
    const unlockedEditorial = this.store.createRecord('unlocked-editorial', {
      contest: this.contest,
      problem: this.problem
    })
    yield unlockedEditorial.save()
    this.fetchEditorialTask.perform()
  }

  @restartableTask fetchEditorialTask = function *() {
    return yield this.store.queryRecord('editorial', {
      custom: {
        ext: 'url',
        url: 'current-editorial'
      },
      contest_id: this.contest.id,
      problem_id: this.problem.id
    })
  }
}
