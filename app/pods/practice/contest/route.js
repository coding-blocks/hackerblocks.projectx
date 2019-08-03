import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class ContestRoute extends Route {
  @service store

  async model(params) {
    const practice = await this.store.findRecord('practice', params.practice_id, {
      include: 'contest,tags'
    })
    return RSVP.hash({
      practice
    })
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.practice.name
    })
  }
}
