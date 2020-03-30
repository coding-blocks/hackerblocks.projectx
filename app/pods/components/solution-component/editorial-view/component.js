import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';

export default class EditorialView extends Component {
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
    yield this.fetchEditorialTask.perform()
  }

  @restartableTask fetchEditorialTask = function *() {
    return yield this.store.queryRecord('editorial', {
      custom: {
        ext: 'url',
        url: 'current-editorial'
      },
      contest_id: this.contest.get('id'),
      problem_id: this.problem.get('id')
    })
  }
}
