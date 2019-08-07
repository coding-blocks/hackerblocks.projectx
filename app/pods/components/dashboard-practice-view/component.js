import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class DashboardPracticeViewComponent extends Component {
  @service store;

  async didReceiveAttrs() {
    this.fetchPracticesTask.perform()
  }

  @restartableTask fetchPracticesTask = function* () {
    const practices = yield this.store.findAll('practice', {
      include: 'tags,contest'
    })

    this.set('practices', practices)
  }
}
