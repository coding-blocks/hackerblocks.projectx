import Route from '@ember/routing/route';

export default class OldContest extends Route {
  model(params) {
    return this.store.findRecord('contest', params.contest_id)
  }
  
  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    })
  }
}
