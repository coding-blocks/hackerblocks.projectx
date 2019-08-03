import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PracticeRoute extends Route {
  @service store

  model() {
    return this.store.findAll('practice', {
      include: 'tags'
    })
  }

  setupController(controller, model) {
    controller.set('practices', model)
  }
}
