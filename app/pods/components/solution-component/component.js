import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class SolutionComponent extends Component {
  @service store

  @computed('problem.editorial')
  get editorial() {
    debugger
    return this.problem.editorial
  }

  @restartableTask unlockEditorialTask = function *() {
    // TODO
  }
}
