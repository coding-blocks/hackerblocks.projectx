import Route from '@ember/routing/route';

export default class CompetitionIdRoute extends Route{
  model (params) {
    return this.store.findRecord('competition', params.competition_id)
  }

  setupController (controller, model) {
    controller.set('competition', model)
  }
}
